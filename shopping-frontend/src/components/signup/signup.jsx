import { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        name: "",
        phone_number: "",
        email: "",
        address: {
            dno: "",
            street: "",
            pinCode: "",
            city: "",
            State: "",
            Country: "",
        },
        isSeller: false,
        isAdmin: false,
        isAdvertiser: false,
        phone: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddressInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            address: {
                ...prevState.address,
                [name]: value,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // or send data to backend API
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="username">Username:</Label>
                <Input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="password">Password:</Label>
                <Input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="name">Name:</Label>
                <Input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="phone_number">Phone Number:</Label>
                <Input
                    type="tel"
                    name="phone_number"
                    id="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="email">Email:</Label>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="dno">Door Number:</Label>
                <Input
                    type="text"
                    name="dno"
                    id="dno"
                    value={formData.address.dno}
                    onChange={handleAddressInputChange}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="street">Street:</Label>
                <Input
                    type="text"
                    name="street"
                    id="street"
                    value={formData.address.street}
                    onChange={handleAddressInputChange}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="pinCode">Pin Code:</Label>
                <Input
                    type="text"
                    name="pinCode"
                    id="pinCode"
                    value={formData.address.pinCode}
                    onChange={handleAddressInputChange}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="city">City:</Label>
                <Input
                    type="text"
                    name="city"
                    id="city"
                    value={formData.address.city}
                    onChange={handleAddressInputChange}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="State">State:</Label>
                <Input
                    type="text"
                    name="State"
                    id="State"
                    value={formData.address.State}
                    onChange={handleAddressInputChange}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="Country">Country:</Label>
                <Input
                    type="text"
                    name="Country"
                    id="Country"
                    value={formData.address.Country}
                    onChange={handleAddressInputChange}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="phone">Phone:</Label>
                <Input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                />
            </FormGroup>
            <FormGroup check>
                <Label check>
                    <Input
                        type="checkbox"
                        name="isSeller"
                        id="isSeller"
                        checked={formData.isSeller}
                        onChange={handleInputChange}
                    />{" "}
                    Are you a seller?
                </Label>
            </FormGroup>
            <FormGroup check>
                <Label check>
                    <Input
                        type="checkbox"
                        name="isAdmin"
                        id="isAdmin"
                        checked={formData.isAdmin}
                        onChange={handleInputChange}
                    />{" "}
                    Are you an admin?
                </Label>
            </FormGroup>
            <FormGroup check>
                <Label check>
                    <Input
                        type="checkbox"
                        name="isAdvertiser"
                        id="isAdvertiser"
                        checked={formData.isAdvertiser}
                        onChange={handleInputChange}
                    />{" "}
                    Are you an advertiser?
                </Label>
            </FormGroup>
            <Button color="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default SignUp;
