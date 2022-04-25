import { User } from "@/models/users/users.model"
import { Request } from "express"
import formidable from "formidable"


interface RequestWithFormidable extends Request {
    files: formidable.Files
    fields: formidable.Fields
}

interface RequestWithUser extends Request {
    user: User
}
  export { RequestWithFormidable, RequestWithUser }