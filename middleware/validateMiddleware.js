const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      
      console.log("Joi Validation Xatosi:", errorMessages);

      return res.status(400).json({
        message: "Validation xatosi",
        errors: errorMessages
      });
    }

    req.body = value;
    next();
  };
};

module.exports = validate;