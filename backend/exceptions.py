
class NotFoundError(Exception):
    """Exception raised when a requested resource is not found."""
    pass

class AlreadyExistsError(Exception):
    """Exception raised when attempting to create a resource that already exists."""
    pass

class MissingFieldsError(Exception):
    """Exception raised when required fields are missing in the input data."""
    pass

class InvalidFieldsError(Exception):
    """Exception raised when input data contains invalid fields."""
    pass
