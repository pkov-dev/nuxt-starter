# Form Components Architecture

## Overview

The form system will be built around three main layers:

    Form
     └── FormField
          └── Input Component

Each layer has a clearly defined responsibility.

---

## 1. Form

**Responsibility:**
Manage the form lifecycle and global form state.

Handles:

- form submission
- validation integration
- pending/loading state
- submit errors
- success state
- reset functionality

The form component should not know about individual fields or specific input types.

---

## 2. FormField

**Responsibility:**
Provide a common wrapper for form fields and manage field-level UI state.

Handles:

- label rendering
- description/hint text
- error message display
- required state
- accessibility attributes (`for`, `aria-*`)
- consistent field layout

The component should be independent from specific input components and use slots for rendering controls.

Example:

    <FormField label="Email" name="email">
      <UiInput />
    </FormField>

---

## 3. Input Components

**Responsibility:**
Provide input controls and their visual behavior.

The first implementation will focus on common text-based inputs:

    BaseInput
     ├── text
     ├── email
     ├── password
     ├── number
     ├── tel
     ├── url
     └── search

`BaseInput` should handle:

- native input behavior
- value binding
- input events
- disabled state
- common HTML attributes

It should remain independent from form layout and validation UI.

---

## Component Structure

    ui/
    ├── form/
    │   ├── BaseForm.vue
    │   └── FormField.vue
    │
    └── input/
        ├── BaseInput.vue
        └── UiInput.vue

`Base*` components provide low-level functionality and reusable behavior.

`Ui*` components provide project-specific styling and design system integration.
