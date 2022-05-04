import { User } from "@/models/users/users.model"
import { Request } from "express"
import formidable from "formidable"


interface RequestWithFormidable extends RequestWithUser {
    files: formidable.Files
    fields: formidable.Fields
    filesName: string[]
    filesPath: string[]
}

interface RequestWithUser extends Request {
    user: User
}
  export { RequestWithFormidable, RequestWithUser }