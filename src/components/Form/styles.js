import styled from "styled-components";

export const Container = styled.div`
    padding: 1rem;
    max-width: 1000px;
    margin: 0 auto;
    font-size: 1rem;
    
    input {
        font-size: inherit;
        padding: 0.25rem;
    }
`;

export const FormTag = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    width: 80%;
    
    span {
        top: -15px;
        font-size: 0.9rem;
        font-weight: bold;
        color: red;
    }

    label {
        margin: 10px 0;
        display: inline-block;
    }

    button {
        margin-top: 3rem;
        margin-right: auto;
        margin-left: auto;
        font-size: 1.2rem;
    }

`;

export const InputTitle = styled.p`
    margin: 10px 0;
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;