import axios from "axios";
import { useEffect, useState } from "react";
import { Form, FormGroup, Input, Label, Button, FormFeedback, CardFooter } from "reactstrap";

const initialValues = {
  ad: "",
  soyad: "",
  email: "",
  parola: "",
};

export const errorMessages = {
  ad: "En az 3 karakter olmalıdır",
  soyad: "En az 2 karakter olmalıdır",
  email: "Geçerli bir e-mail adresi giriniz",
  parola: "En az 8 karakter olmalıdır. En az 1 adet küçük harf, büyük harf, rakam ve sembol içerecek şekilde oluşturulmalıdır",
};

export default function Register() {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({
    ad: false,
    soyad: false,
    email: false,
    parola: false,
  });
  const [isValid, setIsValid] = useState(false);
  const [id, setId] = useState('');

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  useEffect(() => {
    if (
      formData.ad.trim().length >= 3 &&
      formData.soyad.trim().length >= 2 &&
      validateEmail(formData.email) &&
      regex.test(formData.parola)
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let newErrors = { ...errors };

    if (name === "ad" || name === "soyad") {
      newErrors[name] = value.trim().length < (name === "ad" ? 3 : 2);
    }

    if (name === "email") {
      newErrors[name] = !validateEmail(value);
    }

    if (name === "parola") {
      newErrors[name] = !regex.test(value);
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    axios
      .post("http://reqres.in/api/users", formData)
      .then((response) => {
        setId(response.data.id);
        setFormData(initialValues);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
            invalid={errors.ad}
            data-cy="ad-input"
          />
          {errors.ad && <FormFeedback data-cy="error-message">{errorMessages.ad}</FormFeedback>}
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
            invalid={errors.soyad}
            data-cy="soyad-input"
          />
          {errors.soyad && <FormFeedback data-cy="error-message">{errorMessages.soyad}</FormFeedback>}
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
            invalid={errors.email}
            data-cy="email-input"
          />
          {errors.email && <FormFeedback data-cy="error-message">{errorMessages.email}</FormFeedback>}
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
            invalid={errors.parola}
            data-cy="parola-input"
          />
          {errors.parola && <FormFeedback data-cy="error-message">{errorMessages.parola}</FormFeedback>}
        </FormGroup>

        <Button disabled={!isValid} data-cy="submit-button">
          KAYIT
        </Button>
      </Form>

      <CardFooter>
        ID: {id}
      </CardFooter>
    </>
  );
}