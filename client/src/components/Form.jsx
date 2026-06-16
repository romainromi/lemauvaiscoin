import { useForm } from "react-hook-form"

const Form = ({ inputs, onSubmit, submitLabel, btnBg }) => {

  const { register, handleSubmit, formState: { errors } } = useForm()


  return (
    <form   className="form-material" onSubmit={handleSubmit(onSubmit)} >
      {
        inputs.map((input) => (
          <div key={input.name}>

            <label >{input.label}</label>

            <input className=" form-control" type={input.type} {...register(input.name, input.validation)} />
            
            {errors[input.name] && (<p style={{ color: 'red' }} > {errors[input.name].message}</p>)}

          </div>
        ))
      }

<button type="submit" className={btnBg}>{submitLabel}</button>


    </form>
  )
}

export default Form