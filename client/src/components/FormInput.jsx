const FormInput = ({ label, name, type, defaultValue ,onChange}) => {
    return (
      <div className='form-control '>
        <label className='label'>
          <span className='label-text capitalize'>{label}</span>
        </label>
        <input
          type={type}
          name={name}
          defaultValue={defaultValue}
          className='input input-bordered '
          onChange={onChange}
        />
      </div>
    );
  };
  export default FormInput;