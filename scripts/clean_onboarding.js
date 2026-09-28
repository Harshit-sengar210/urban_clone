const fs = require('fs');
const path = require('path');

const steps = [
  'personal',
  'business',
  'services',
  'service-area',
  'experience',
  'verification',
  'bank',
  'availability',
  'review'
];

steps.forEach(step => {
  const file = path.join('src/app/vendor/onboarding', step, 'page.tsx');
  if (!fs.existsSync(file)) return;
  
  let content = fs.readFileSync(file, 'utf-8');
  
  // Strip out old loadData useEffect and localStorage auto-save
  const loadDataRegex = /useEffect\(\(\) => \{\s*const loadData[\s\S]*?\}, \[\]\);/g;
  content = content.replace(loadDataRegex, '');
  
  const autoSaveRegex = /\/\/ Auto-save to localStorage[\s\S]*?\}, \[.*?\]\);/g;
  content = content.replace(autoSaveRegex, '');
  
  // Replace getDoc / setDoc / updateDoc imports with useVendorOnboarding
  content = content.replace(/import {.*?doc,.*?getDoc,.*?setDoc.*?}.*?firebase\/firestore.*?;/g, 'import { useVendorOnboarding } from "@/contexts/vendor/VendorOnboardingProvider";');
  content = content.replace(/import {.*?doc,.*?updateDoc,.*?setDoc.*?}.*?firebase\/firestore.*?;/g, 'import { useVendorOnboarding } from "@/contexts/vendor/VendorOnboardingProvider";');
  
  // Remove validateOnboardingSession calls
  content = content.replace(/const { validateOnboardingSession } = await import\("@\/lib\/onboardingSession"\);\s*validateOnboardingSession\(\);/g, '');
  
  // Remove old handleSave (localStorage)
  const handleSaveRegex = /const handleSave = \(\) => \{[\s\S]*?setTimeout\(\(\) => setToastMessage\(""\), 3000\);\s*\};/g;
  content = content.replace(handleSaveRegex, '');
  
  fs.writeFileSync(file, content);
  console.log('Cleaned ' + step);
});
