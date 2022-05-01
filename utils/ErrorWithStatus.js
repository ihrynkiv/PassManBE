class ErrorWithStatus extends Error {
  constructor(status, type, errorData) {
    super(errorData);

    this.type = type;
    this.status = status;
    this.data = errorData;
  }

  getStatus() {
    return this.status;
  }

  getType() {
    return this.type;
  }

  getInfo() {
    return this.data;
  }
}

module.exports = ErrorWithStatus;
