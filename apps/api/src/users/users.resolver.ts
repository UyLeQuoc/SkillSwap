import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { UsersService } from "./users.service"
import { CreateUserInput } from "./inputs/create-user.input"
import { UpdateUserInput } from "./inputs/update-user.input"
import { UserEntity } from "./entities/user.entity"

@Resolver(() => UserEntity)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Mutation(() => UserEntity)
    createUser(@Args("createUserInput") createUserInput: CreateUserInput) {
        return this.usersService.create(createUserInput)
    }

    @Query(() => [UserEntity])
    findAll() {
        return this.usersService.findAll()
    }

    @Query(() => UserEntity)
    findOne(@Args("id") id: string) {
        return this.usersService.findOne(id)
    }

    @Mutation(() => UserEntity)
    updateUser(@Args("updateUserInput") updateUserInput: UpdateUserInput) {
        return this.usersService.update(updateUserInput.id, updateUserInput)
    }

    @Mutation(() => UserEntity)
    removeUser(@Args("id") id: string) {
        return this.usersService.remove(id)
    }
} 