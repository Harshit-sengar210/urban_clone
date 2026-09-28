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

  // Find the exact block for `useEffect(() => { const loadData = async ...` and remove it
  const useEffIdx = content.indexOf('  useEffect(() => {\n    const loadData = async () => {');
  if (useEffIdx !== -1) {
    // Find the end of this useEffect which is `  }, []);`
    const endUseEffIdx = content.indexOf('  }, []);', useEffIdx);
    if (endUseEffIdx !== -1) {
      content = content.substring(0, useEffIdx) + content.substring(endUseEffIdx + 9);
    }
  }

  // Remove `db` and `doc` imports if they are still there
  content = content.replace(/import \{ auth, db \} from "@\/backend\/firebase";/g, 'import { auth } from "@/backend/firebase";');

  fs.writeFileSync(filePath, content);
  console.log(`Cleaned loadData in ${step.name}`);
});
