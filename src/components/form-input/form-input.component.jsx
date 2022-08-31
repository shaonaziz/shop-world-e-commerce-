import "./form-input.styles.scss";
const FormInput = ({ lable, ...othersProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...othersProps} />
      {lable && (
        <lable
          className={`${
            othersProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {lable}
        </lable>
      )}
    </div>
  );
};

export default FormInput;
