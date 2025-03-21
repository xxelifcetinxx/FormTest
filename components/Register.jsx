import { Form, FormGroup, Input, Label, Button } from "reactstrap";

export default function Register() {
  return (
    <>
      <Form>
        <FormGroup>
          <Label for="ad">ad:</Label>
          <Input id="ad" name="ad" placeholder="adınızı giriniz" type="text" />
        </FormGroup>
        <FormGroup>
          <Label for="soyad">soyad:</Label>
          <Input
            id="soyad"
            name="soyad"
            placeholder="soyadınızı giriniz"
            type="text"
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">email:</Label>
          <Input
            id="email"
            name="email"
            placeholder="emailinizi giriniz"
            type="email"
          />
        </FormGroup>

        <FormGroup>
          <Label for="parola">parola:</Label>
          <Input
            id="examplePassword"
            name="password"
            placeholder="uygun bir parola seçiniz"
            type="password"
          />
        </FormGroup>

        <Button>KAYIT OL</Button>
      </Form>
    </>
  );
}