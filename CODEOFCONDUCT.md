# Code of Conduct for React and TypeScript Projects

## Best Practices for Development

### 1. Folder Structure

- **Layered Folder Structure**: Use a layer-based folder structure to group related components, hooks, and reducer and store logic together.

### 2. TypeScript Usage

- **Interface Declaration**:

- **Local Definitions**: Define interfaces locally at the top of the file for props or types specific to that component or module.

  ```typescript
  // ExampleComponent.tsx

  import React from 'react';

  interface ExampleProps {
    name: string;
    age: number;
  }

  const ExampleComponent: React.FC<ExampleProps> = ({ name, age }) => {
    return (
      <div>
        <h2>{name}</h2>
        <p>Age: {age}</p>
      </div>
    );
  };

  export default ExampleComponent;
  ```

- **Global Definitions**: For interfaces/types reused across multiple components or files, declare them in a centralized `types` folder.

  ```typescript
  // src/interfaces/CommonInterfaces.ts

  export interface User {
    id: number;
    username: string;
    email: string;
  }
  ```

### 3. Code Structure and Readability

- **Component Structure**: Follow consistent naming conventions and structure for components, hooks, and utilities to improve readability and maintainability and try to make component that has less business logic.

- **Business Login**: when login for particular component get more function/code in that we can move that function/code into the service folder or we can create custom hooks.

- **Type Safety**: Leverage TypeScript's strong typing features to enforce type safety and reduce runtime errors.

### 4. Git and Version Control

- **Validate Code Practice**: use 'npm run lint' and solve that warning/error, that error you get from rule we defined in .esllintrc.ts file.

- **Branching Strategy**: Adopt a clear branching strategy (e.g., GitFlow) to manage feature development, bug fixes, and releases.

- **Commit Guidelines**: Use descriptive commit messages following a standardized format (e.g., Conventional Commits) to facilitate understanding and tracking of changes.

---

This Code of Conduct outlines best practices for developers working on React and TypeScript projects, emphasizing folder structure, TypeScript usage, code readability, version control, testing, and documentation. It provides guidelines on when to declare interfaces locally versus globally for effective code organization and reuse.
