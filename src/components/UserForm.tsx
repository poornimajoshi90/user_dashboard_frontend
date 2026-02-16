import { useState } from "react";
import type { User } from "../types/user";
import { Form, Row, Col, Button } from "react-bootstrap";

interface Props {
  initialData?: User;
  onSubmit: (data: User) => void;
  isEditing?: boolean;
}

const UserForm = ({ initialData, onSubmit, isEditing }: Props) => {

  const formFields: {
    name: keyof User;
    label: string;
    type: string;
    required?: boolean;
    pattern?: RegExp;
  }[] = [
    { name: "firstName", label: "First Name", type: "text", required: true },
    { name: "lastName", label: "Last Name", type: "text" },
    {
      name: "phone",
      label: "Phone",
      type: "tel",
      pattern: /^[0-9]{10}$/,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  ];

  const createEmptyForm = (): User => {
    return formFields.reduce((acc, field) => {
      return { ...acc, [field.name]: "" };
    }, {} as User);
  };

 const [formData, setFormData] = useState<User>(() => {
  return initialData ?? createEmptyForm();
});


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    for (const field of formFields) {
      const value = formData[field.name];

      if (field.required && !value) {
        alert(`${field.label} is required`);
        return;
      }

      if (
        field.pattern &&
        typeof value === "string" &&
        value &&
        !field.pattern.test(value)
      ) {
        alert(`Invalid ${field.label}`);
        return;
      }
    }

    onSubmit(formData);
    setFormData(createEmptyForm());
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-3">
        {formFields.map((field) => (
          <Col md={6} key={field.name}>
            <Form.Group>
              <Form.Label>{field.label}</Form.Label>
              <Form.Control
                type={field.type}
                name={field.name}
                value={formData[field.name] as string}
                onChange={handleChange}
                required={field.required}
              />
            </Form.Group>
          </Col>
        ))}
      </Row>

      <div className="mt-4">
        <Button
  type="submit"
  variant="primary"
  className="px-4"
>
  {isEditing ? "Update User" : "Add User"}
</Button>

      </div>
    </Form>
  );
};

export default UserForm;
