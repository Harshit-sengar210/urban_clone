const fs = require('fs');
const path = require('path');

const steps = [
  { name: 'service-area', saveMethod: 'saveServiceArea', next: 'experience' },
  { name: 'experience', saveMethod: 'saveExperience', next: 'verification' },
  { name: 'verification', saveMethod: 'saveVerification', next: 'bank' },
  { name: 'bank', saveMethod: 'saveBankPayout', next: 'availability' },
  { name: 'availability', saveMethod: 'saveAvailability', next: 'review' },
];

steps.forEach(step => {
  const filePath = path.join('src/app/vendor/onboarding', step.name, 'page.tsx');
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace localStorage.setItem in handleContinue
  const regex = /localStorage\.setItem\("vendor_onboarding_step[0-9]+",\s*JSON\.stringify\(.*?\)\);/g;
  content = content.replace(regex, `await ${step.saveMethod}(data);`);

  fs.writeFileSync(filePath, content);
  console.log(`Updated handleContinue in ${step.name}`);
});
