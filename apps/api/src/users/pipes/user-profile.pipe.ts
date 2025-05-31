import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common"
import { UpdateUserInput } from "../dto/update-user.input"

@Injectable()
export class UserProfilePipe implements PipeTransform {
    transform(value: UpdateUserInput) {
        if (value.name && value.name.length > 50) {
            throw new BadRequestException("Name must be less than 50 characters")
        }

        if (value.bio && value.bio.length > 500) {
            throw new BadRequestException("Bio must be less than 500 characters")
        }

        if (value.avatarUrl && !this.isValidUrl(value.avatarUrl)) {
            throw new BadRequestException("Invalid avatar URL")
        }

        return value
    }

    private isValidUrl(url: string): boolean {
        try {
            new URL(url)
            return true
        } catch {
            return false
        }
    }
}
