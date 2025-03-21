import axios from "axios";
import { useEffect, useState } from "react";
import { Form, FormGroup, Input, Label, Button, FormFeedback, Alert, CardFooter } from "reactstrap";

const initialValues = {
  ad: "",
  soyad: "",
  email: "",
  parola: "",
};

const errorMessages = {
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
  const [touched, setTouched] = useState({
    ad: false,
    soyad: false,
    email: false,
    parola: false,
  });
  const [isValid, setIsValid] = useState(false);
  const [id, setId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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
    setTouched({ ...touched, [name]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    axios
      .post("http://reqres.in/api/users", formData)
      .then((response) => {
        setId(response.data.id);
        setFormData(initialValues);
        setSuccessMessage(`Kayıt Başarılı! ID: ${response.data.id}`);
        setTouched({
          ad: false,
          soyad: false,
          email: false,
          parola: false,
        });
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
            invalid={errors.ad && touched.ad}
            data-cy="ad-input"
          />
          {errors.ad && touched.ad && <FormFeedback data-cy="error-message">{errorMessages.ad}</FormFeedback>}
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
            invalid={errors.soyad && touched.soyad}
            data-cy="soyad-input"
          />
          {errors.soyad && touched.soyad && <FormFeedback data-cy="error-message">{errorMessages.soyad}</FormFeedback>}
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
            invalid={errors.email && touched.email}
            data-cy="email-input"
          />
          {errors.email && touched.email && <FormFeedback data-cy="error-message">{errorMessages.email}</FormFeedback>}
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
            invalid={errors.parola && touched.parola}
            data-cy="parola-input"
          />
          {errors.parola && touched.parola && <FormFeedback data-cy="error-message">{errorMessages.parola}</FormFeedback>}
        </FormGroup>

        <Button disabled={!isValid} data-cy="submit-button">
          KAYIT
        </Button>
      </Form>
      <CardFooter>
      {successMessage && <Alert color="success">{successMessage}</Alert>}
      {id && <Alert color="info">Kullanıcı ID: {id}</Alert>}
      </CardFooter>
    </>
  );
}