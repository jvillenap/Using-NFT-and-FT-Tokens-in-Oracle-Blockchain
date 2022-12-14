
    @Validator(yup.string(), yup.string(), yup.string(), yup.string(), yup.string(), yup.number())
    public async transferECoins(token_id: string, from_org_id: string, from_user_id: string,  to_org_id: string, to_user_id: string, quantity: number) {
        const token_asset = await this.getTokenObject(token_id);
        const to_account_id = await this.Ctx.Account.generateAccountId(token_id, to_org_id, to_user_id);
        const from_account_id = await this.Ctx.Account.generateAccountId(token_id, from_org_id, from_user_id);
        return await this.Ctx.Token.transferFrom(from_account_id, to_account_id, quantity, token_asset);
    }
