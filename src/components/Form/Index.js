import React from 'react';
import { Container, FormTag, InputTitle, InputContainer } from './styles';
import { useForm } from 'react-hook-form'

const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            cpf: '',
            cnpj: '',
            telefone: ''
        },
        reValidateMode: 'onSubmit'
    });

    function validateCpf(cpf) {
        //Eliminate invalids cpf
        if (cpf === "000.000.000-00" || cpf === "111.111.111-11" || cpf === "222.222.222-22" ||
            cpf === "333.333.333-33" || cpf === "444.444.444-44" || cpf === "555.555.555-55" ||
            cpf === "666.666.666-66" || cpf === "777.777.777-77" || cpf === "888.888.888-88" ||
            cpf === "999.999.999-99") {
            return false;
        }

        let cpfArray = cpf.split('.').join('').split('-').join('').split('');
        cpfArray = cpfArray.map((num) => Number(num));
        const checkers = cpfArray.slice(9);
        let temp = 0;
        let validateResult = [];
        
        // For the fist result digit:
        for (let i = 0; i < 9 ; i++) {
          temp = temp + (cpfArray[i] * (10 - i));
        }
        validateResult.push((temp%11 < 2) ? 0 : (11 - temp%11));
        temp = 0;

        // For the second result digit:
        for (let i = 0; i < 10 ; i++) {
          temp = temp + (cpfArray[i] * (11 - i));
        }
        validateResult.push((temp%11 < 2) ? 0 : (11 - temp%11));
        
        // Check if math the Result with Chekers.
        for (let i = 0; i < 2; i++) {
          if (validateResult[i] !== checkers[i])
            return false;
        }
        return true;
    }

    function validateCnpj(cnpj) {
        //Eliminate invalids cnpj 
        if (cnpj === "00.000.000/0000-00" || cnpj === "11.111.111/1111-11" ||
            cnpj === "22.222.222/2222-22" || cnpj === "33.333.333/3333-33" ||
            cnpj === "44.444.444/4444-44" || cnpj === "55.555.555/5555-55" ||
            cnpj === "66.666.666/6666-66" || cnpj === "77.777.777/7777-77" ||
            cnpj === "88.888.888/8888-88" || cnpj === "99.999.999/9999-99") {
            return false;
        }

        let cnpjArray = cnpj.split('.').join('').split('-').join('').split('/').join('').split('');
        cnpjArray = cnpjArray.map((num) => Number(num));
        const checkers = cnpjArray.slice(12);
        const firstCheck = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        const secondCheck = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        let temp = 0;
        let validateResult = [];
        
        //For the first result digit:
        for (let i = 0; i < 12; i++) {
            temp = temp + (cnpjArray[i] * firstCheck[i]);
        }
        validateResult.push((temp % 11 < 2) ? 0 : (11 - temp % 11));
        temp = 0;

        //For the second result digit:
        for (let i = 0; i < 13; i++) {
          temp = temp + (cnpjArray[i] * secondCheck[i])
        }
        validateResult.push((temp % 11 < 2) ? 0 : (11 - temp % 11));
        
        //Check if math the Result with Chekers.
        for (let i = 0; i < 2; i++) {
          if (validateResult[i] !== checkers[i])
            return false;
        }
        
        return true;
      }
    

    return (
        <Container>
            <FormTag onSubmit={handleSubmit((data) => {
                console.log(data);
            })}>
                <h1>Formulário</h1>

                <InputContainer>
                    <InputTitle>Name</InputTitle>
                    <input
                        {...register('name', {
                            required: "Nome obrigatório"
                        })}
                        type='text'
                        name='name'
                        placeholder='Seu nome'
                    />
                    <span>{errors.name?.message}</span>
                </InputContainer>

                <InputContainer>
                    <InputTitle>CPF</InputTitle>
                    <input
                        {...register('cpf', {
                            minLength: {
                                value: 14,
                                message: "CPF incompleto"
                            },
                            onChange: (e) => {
                                //000.111.222-33
                                e.target.value = e.target.value
                                    .replace(/\D/g, "")
                                    .replace(/(\d{3})(\d{1})/, "$1.$2")
                                    .replace(/(\d{3})(\d{1})/, "$1.$2")
                                    .replace(/(\d{3})(\d{1})/, "$1-$2")
                                    .replace(/(-\d{2})\d+?$/, "$1");
                            },
                            validate: (value) => validateCpf(value) || "CPF inválido."
                        })}
                        type='text'
                        name='cpf'
                        placeholder='000.000.000-00'
                    />
                    <span>{errors.cpf?.message}</span>
                </InputContainer>

                <InputContainer>
                    <InputTitle>CNPJ</InputTitle>
                    <input
                        placeholder="00.000.000/0000-00"
                        {...register('cnpj', {
                            minLength: {
                                value: 18,
                                message: "CNPJ Incompleto"
                            },
                            onChange: (e) => {
                                //00.111.222/0001-11
                                e.target.value = e.target.value
                                    .replace(/\D/g, "")
                                    .replace(/(\d{2})(\d{1})/, "$1.$2")
                                    .replace(/(\d{3})(\d{1})/, "$1.$2")
                                    .replace(/(\d{3}.)(\d{3})(\d{1})/, "$1$2/$3")
                                    .replace(/(\d{4})(\d{1})/, "$1-$2")
                                    .replace(/(-\d{2})\d+?$/, "$1")
                            },
                            validate: (value) => validateCnpj(value) || "CNPJ inválido"
                        })}
                    />
                    <span>{errors.cnpj?.message}</span>
                </InputContainer>

                <InputContainer>
                    <InputTitle>Telefone</InputTitle>
                    <input
                        placeholder= "(11) 11111-1111"
                        {...register('telefone', {
                            required: {
                                value: true,
                                message: "Telefone Obrigátorio"
                            },
                            minLength: {
                                value: 13,
                                message: "Telefone incompleto"
                            },
                            onChange: (e) => {
                                e.target.value = e.target.value
                                    .replace(/(\D)/g, "")
                                    .replace(/(\d{2})(\d{1})/, "($1) $2")
                                    .replace(/(\d{4})(\d{1})/, "$1-$2")
                                    .replace(/(\d{4})-(\d{1})(\d{4})/, "$1$2-$3")
                                    .replace(/(-\d{4})\d+?$/, "$1")
                            }
                        })}
                    />
                    <span>{errors.telefone?.message}</span>
                </InputContainer>
                <button type='submit'>Submit</button>
            </FormTag>
        </Container>
    );
};

export default Form;