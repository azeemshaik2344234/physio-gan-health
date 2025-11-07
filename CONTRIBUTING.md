# Contributing to GAN-PINN Clinical Platform

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## 🎯 How to Contribute

### Reporting Bugs
1. Check existing issues to avoid duplicates
2. Create a detailed bug report including:
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (browser, OS)

### Suggesting Features
1. Check if the feature already exists or is planned
2. Create a feature request with:
   - Clear use case
   - Expected behavior
   - Potential implementation approach
   - Clinical/research justification

### Code Contributions

#### Setup Development Environment
```bash
git clone <repo-url>
cd gan-pinn-clinical-platform
npm install
npm run dev
```

#### Coding Standards
- **TypeScript**: Use strict type checking
- **React**: Functional components with hooks
- **Styling**: Use Tailwind CSS semantic tokens (no inline styles)
- **Components**: Small, focused, reusable
- **Naming**: Clear, descriptive names (camelCase for variables, PascalCase for components)

#### Design System
- Always use design system tokens from `src/index.css`
- Never use direct colors (e.g., `text-white`, `bg-blue-500`)
- Use semantic tokens: `text-foreground`, `bg-primary`, etc.
- Create new variants in components rather than overrides

#### Pull Request Process
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes following the coding standards
4. Test thoroughly
5. Commit with clear messages: `git commit -m "feat: add HOMA-IR calculator"`
6. Push: `git push origin feature/your-feature-name`
7. Create a Pull Request with:
   - Clear description of changes
   - Screenshots/demos if UI changes
   - Reference to related issues
   - Confirmation of HIPAA compliance if handling data

## 🔒 Security & Privacy Guidelines

### HIPAA Compliance
- **Never** log PHI (Personal Health Information)
- **Always** de-identify data before processing
- **Use** encryption for data at rest and in transit
- **Implement** audit trails for data access
- **Document** privacy considerations in PR

### Data Handling
- All user data must have explicit consent
- Synthetic data generation must prevent disclosure risk
- No PHI in error messages or debugging output
- Follow principle of least privilege

## 🧪 Testing Requirements

### Before Submitting PR
- [ ] All existing tests pass
- [ ] New features have test coverage
- [ ] Manual testing completed
- [ ] No console errors in browser
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Accessibility checked (keyboard navigation, screen readers)

### Writing Tests
```typescript
// Example: Component test
import { render, screen } from '@testing-library/react';
import DemographicsStep from './DemographicsStep';

test('calculates BMI correctly', () => {
  // Test implementation
});
```

## 📝 Commit Message Convention

Use conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, no logic change)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add LH/FSH ratio calculator to labs step
fix: correct BMI calculation decimal places
docs: update README with PINN architecture details
refactor: extract HOMA-IR calculation to utility
```

## 🏥 Clinical Validation

For ML/clinical contributions:
- Cite relevant research papers
- Document clinical rationale
- Validate against established medical knowledge
- Include uncertainty quantification
- Add clinician review requirements

## 🎨 UI/UX Guidelines

- **Medical aesthetics**: Professional, clean, trustworthy
- **Accessibility**: WCAG 2.1 AA compliance
- **Progressive disclosure**: Don't overwhelm users
- **Clear feedback**: Loading states, error messages, success confirmations
- **Responsive**: Mobile-first approach

## 🤔 Questions?

- Open a discussion on GitHub
- Check existing documentation
- Review similar issues/PRs

## 📜 Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Welcome newcomers
- Prioritize patient safety and privacy
- Follow medical ethics guidelines

Thank you for contributing to advancing clinical ML research! 🙏
