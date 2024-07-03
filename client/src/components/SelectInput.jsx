const SelectInput = ({ label, name, list, onChange,defaultValue="" }) => {
  return (
    <div className="form-control">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <select className="select select-bordered" name={name} id={name} onChange={onChange} defaultValue={defaultValue}>
        {list?.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
