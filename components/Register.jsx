import { Form, FormGroup, Input, Label, Button } from "reactstrap";

export default function Register() {
  return (
    <>
      <Form>
        <FormGroup>
          <Label for="ad">Ad:</Label>
          <Input id="ad" name="ad" placeholder="adınızı giriniz" type="text" />
        </FormGroup>
        <FormGroup>
          <Label for="soyad">Soyad:</Label>
          <Input
            id="soyad"
            name="soyad"
            placeholder="Soyadınızı giriniz!"
            type="text"
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email:</Label>
          <Input
            id="email"
            name="email"
            placeholder="E-mailinizi giriniz!"
            type="email"
          />
        </FormGroup>

        <FormGroup>
          <Label for="parola">Parola:</Label>
          <Input
            id="parola"
            name="parola"
            placeholder="Uygun bir parola giriniz!"
            type="parola"
          />
        </FormGroup>

        <Button>KAYIT</Button>
      </Form>
    </>
  );
}