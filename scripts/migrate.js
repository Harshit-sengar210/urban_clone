const fs = require('fs');
const path = require('path');

const steps = [
  { name: 'services', saveMethod: 'saveServices', var: 'services' },
  { name: 'service-area', saveMethod: 'saveServiceArea', var: 'serviceArea' },
  { name: 'experience', saveMethod: 'saveExperience', var: 'experience' },
  { name: 'verification', saveMethod: 'saveVerification', var: 'verification' },
  { name: 'bank', saveMethod: 'saveBankPayout', var: 'payouts' },
  { name: 'availability', saveMethod: 'saveAvailability', var: 'availability' },
];

steps.forEach(step => {
  const filePath = path.join('src/app/vendor/onboarding', step.name, 'page.tsx');
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Update imports
  content = content.replace(/import \{ auth.*?\} from "@\/backend\/firebase";/g, 'import { useVendorOnboarding } from "@/contexts/vendor/VendorOnboardingProvider";');
  content = content.replace(/import \{ doc.*?\} from "firebase\/firestore";/g, '');

  // 2. Add useVendorOnboarding inside component
  const componentMatch = content.match(/export default function .*?\(\) \{[\s\S]*?const \[data, setData\] = useState.*?;/);
  if (componentMatch) {
    if (!content.includes('useVendorOnboarding()')) {
      content = content.replace(componentMatch[0], componentMatch[0] + `\n  const { application, loading, ${step.saveMethod} } = useVendorOnboarding();`);
    }
  }

  // 3. Remove all useEffects for loadData and auto-save
  content = content.replace(/useEffect\(\(\) => \{\s*const loadData = async \(\) => \{[\s\S]*?return \(\) => unsubscribe\(\);\s*\}, \[\]\);/g, '');
  content = content.replace(/\/\/ Auto-save to localStorage[\s\S]*?\}, \[.*?\]\);/g, '');

  // 4. Add context population
  const populateHook = `
  useEffect(() => {
    if (application?.${step.var}) {
      setData(prev => ({
        ...prev,
        ...application.${step.var}
      }));
    }
  }, [application]);
`;
  if (!content.includes(`if (application?.${step.var})`)) {
    content = content.replace(/const \[isLoaded, setIsLoaded\] = useState\(false\);/, `const [isLoaded, setIsLoaded] = useState(false);\n${populateHook}`);
  }

  // 5. Replace handleSave
  const handleSaveRegex = /const handleSave = \(\) => \{[\s\S]*?setTimeout\(\(\) => setToastMessage\(""\), 3000\);\s*\};/g;
  content = content.replace(handleSaveRegex, `const handleSave = async () => {
    try {
      await ${step.saveMethod}(data);
      setToastMessage("Your onboarding progress has been saved.");
    } catch (e) {
      setToastMessage("Could not save progress.");
    }
    setTimeout(() => setToastMessage(""), 3000);
  };`);

  // 6. Replace handleContinue
  // We need to carefully strip out setDoc / updateDoc and localStorage setItem
  content = content.replace(/if \(auth\.currentUser\) \{[\s\S]*?merge: true \}\);\s*\}/g, '');
  content = content.replace(/try \{\s*localStorage\.setItem\("vendor_onboarding_.*?JSON\.stringify\(data\)\);\s*\} catch \(e\) \{\s*console\.warn.*?\s*\}/g, '');
  
  // Actually, replacing handleContinue is tricky. Let's just find the generic "save" logic and replace it.
  content = content.replace(/const dataToSave = \{ \.\.\.data \};/g, `const dataToSave = { ...data };\n        await ${step.saveMethod}(dataToSave);`);

  // 7. Update loading state
  content = content.replace(/if \(!isLoaded\) return null;/g, 'if (loading) return null;');

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${step.name}`);
});
