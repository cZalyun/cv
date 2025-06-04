# Peter Bence Czaun - CV Website

<div align="center">

![Version](https://img.shields.io/badge/Angular-20.0.0-dd0031?logo=angular)
![License](https://img.shields.io/badge/License-MIT-blue)
[![Build](https://github.com/cZalyun/cv/actions/workflows/publish.yml/badge.svg)](https://github.com/cZalyun/cv/actions/workflows/publish.yml)

</div>

## 📋 Overview

This repository contains the source code for [peterbenceczaun.me](https://peterbenceczaun.me) - my CV.


## 🛠️ Technology Stack

- **Framework**: Angular 20
- **Language**: TypeScript
- **Styling**: CSS

## 🚀 Development

### Prerequisites

- Node.js (preferably managed with NVM)
- npm

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/cZalyun/cv.git
   cd cv
   ```

2. Set up Node version with NVM and install dependencies:
   ```bash
   nvm use
   npm ci
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200/`

### Building for Production

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## 📝 Code Standards

This project follows strict coding guidelines:

### TypeScript Configuration

- **Strict Type Checking**: Full TypeScript strict mode enabled
- **Null Safety**: Strict null checks and property initialization
- **Quality Enforcement**: No unused locals/parameters, no implicit returns
- **Latest JavaScript Features**: ESNext target with modern module resolution

### ESLint Configuration

The project uses a comprehensive ESLint setup with:

- Strict TypeScript rules (all rules enabled)
- Angular-specific linting for both code and templates
- SonarJS code quality rules for detecting code smells
- Prettier integration for consistent formatting
- Additional linting for JSON, CSS, and Markdown files

All code must pass linting checks before being committed.

## 🤝 Contributing

While this is primarily a personal website, suggestions and improvements are welcome. Please feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

