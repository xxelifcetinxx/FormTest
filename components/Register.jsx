import { useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";


const initialValues = {
  ad: "",
  soyad: "",
  email: "",
  parola: "",
};

export default function Register() {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData ({ ...formData, [name]: value }) 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //????
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="ad">Ad:</Label>
          <Input 
          id="ad" 
          name="ad" 
          placeholder="Adınızı giriniz" 
          type="text"
          onChange={handleChange}
          value={formData.ad}
          />
        </FormGroup>
        <FormGroup>
          <Label for="soyad">Soyad:</Label>
          <Input
            id="soyad"
            name="soyad"
            placeholder="Soyadınızı giriniz!"
            type="text"
            onChange={handleChange}
            value={formData.soyad}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email:</Label>
          <Input
            id="email"
            name="email"
            placeholder="E-mailinizi giriniz!"
            type="email"
            onChange={handleChange}
            value={formData.email}
          />
        </FormGroup>

        <FormGroup>
          <Label for="parola">Parola:</Label>
          <Input
            id="parola"
            name="parola"
            placeholder="Uygun bir parola giriniz!"
            type="password"
            onChange={handleChange}
            value={formData.parola}
          />
        </FormGroup>

        <Button>KAYIT</Button>
      </Form>
    </>
  );

}