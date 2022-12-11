    @Validator(yup.string(), yup.string(), yup.string(), yup.string(), yup.string(), yup.date(), yup.date())
    public async receiveDevice(tokenId: string, fromOrgId: string, fromUserId: string, toOrgId: string, toUserId: string, contractStartTime: Date, contractEndTime: Date) {
        try {
            const token = await this.Ctx.ERC721Token.get(tokenId);
            //const t = new EBikeNFT(token, false, true);
            const t = new RentableDeviceNFT(token);
            t.contractStartTime = contractStartTime;
            t.contractEndTime = contractEndTime;
            var msg = `rentableDevice Token ID : '${tokenId}' has not been transferred'`;
            if (t.lockingFlag == false) {
                const from_account_id = await this.Ctx.ERC721Account.generateAccountId(fromOrgId, fromUserId);
                const to_account_id = await this.Ctx.ERC721Account.generateAccountId(toOrgId, toUserId);
                await this.Ctx.ERC721Token.transferFrom(from_account_id, to_account_id, t);
            }
            msg = `Rentable Device Token ID : '${tokenId}' has been successfully transferred to UserID : '${toUserId}'`;
            return msg;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    @Validator(yup.string(), yup.string(), yup.string(), yup.string(), yup.string(), yup.string(), yup.date(), yup.boolean(), yup.number())
    public async returnDevice(nftTokenId: string, ftTokenId: string, fromOrgId: string, fromUserId: string, toOrgId: string, toUserId: string, returnTime: Date, deductAmount: boolean, deductionOrChargeAmount: number) {
        try {
            const token = await this.Ctx.ERC721Token.get(nftTokenId);
            //const t = new EBikeNFT(token, false, true);
            const t = new RentableDeviceNFT(token);
            const oChainUtil = new OChainUtils(this.Ctx.Stub);
            if (t.lockingFlag == false) {
                var msg = `Rental Device Token ID : '${nftTokenId}' has not been transferred'`;
                if (t.contractEndTime < returnTime) {
                    t.contractViolationFlag = true;
                }
                else {
                    // Rental Cost is lower than Deposit, so amount of eCoins to transfer is from eshop to lessee 
                    if (deductAmount == true) {
                        //                                 ChaincodeName        ChaincodeMethod          args                                                                    Channel
                        await oChainUtil.invokeChaincode("eShopCriptoFT", "transferECoins", [ftTokenId, toOrgId, toUserId, fromOrgId, fromUserId, String(deductionOrChargeAmount)], "rentalshop");
                    } else {
                    // Rental Cost is bigger than Deposit, so amount of eCoins to transfer is from lessee to eshop 
                        //                                 ChaincodeName        ChaincodeMethod          args                                                                    Channel
                        await oChainUtil.invokeChaincode("eShopCriptoFT", "transferECoins", [ftTokenId, fromOrgId, fromUserId, toOrgId, toUserId, String(deductionOrChargeAmount)], "rentalshop");
                    }
                }
                t.actualEndTime = returnTime;
                const from_account_id = await this.Ctx.ERC721Account.generateAccountId(fromOrgId, fromUserId);
                const to_account_id = await this.Ctx.ERC721Account.generateAccountId(toOrgId, toUserId);
                await this.Ctx.ERC721Token.safeTransferFrom(from_account_id, to_account_id, t);
                msg = `Rental Device Token ID : '${nftTokenId}' has been successfully transferred to UserID : '${toUserId}'`;
            }
            else {
                msg = `Rental Device Token ID : '${nftTokenId}' can't be returned as the Rental Device is locked`;
            }
            return msg;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    @Validator(yup.string())
    public async lockDevice(tokenId: string) {
        try {
            const token = await this.Ctx.ERC721Token.get(tokenId);
            const t = new RentableDeviceNFT(token);
            t.lockingFlag = true;
            await this.Ctx.ERC721Token.updateToken(t);
            var msg = `Rentable Device Token ID : '${tokenId}' has been locked`;
            return { msg };
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    @Validator(yup.string())
    public async unlockDevice(tokenId: string) {
        try {
            const token = await this.Ctx.ERC721Token.get(tokenId);
            const t = new RentableDeviceNFT(token);
            t.lockingFlag = false;
            await this.Ctx.ERC721Token.updateToken(t);
            var msg = `Rentable Device Token ID : '${tokenId}' has been un-locked`;
            return { msg };
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    @Validator(yup.string(), yup.date(), yup.number(), yup.number(), yup.number())
    public async bookDevice(tokenId: string, bookingDate: Date, bookingAmount: number, bookingId: number, ftTokenId: string, fromOrgId: string, fromUserId: string, toOrgId: string, toUserId: string, depositAmount: number) {
        try {
            const token = await this.Ctx.ERC721Token.get(tokenId);
            const t = new RentableDeviceNFT(token);
            const oChainUtil = new OChainUtils(this.Ctx.Stub);
            t.bookingFlag = true;
            t.bookingStartTime = bookingDate;
            t.bookingAmount = bookingAmount;
            t.bookingId = bookingId;

            var msg = `RentableDevice Token ID : '${tokenId}' has NOT been booked'`;

            // Charge a Deposit to the lessee
            //                               ChaincodeName   ChaincodeMethod    args                                                                          Channel
            await oChainUtil.invokeChaincode("eShopCriptoFT", "transferECoins", [ftTokenId, fromOrgId, fromUserId, toOrgId, toUserId, String(depositAmount)], "rentalshop");
            
            await this.Ctx.ERC721Token.updateToken(t);

            var msg = `RentableDevice Token ID : '${tokenId}' has been booked`;
            return { msg };
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    @Validator(yup.string(), yup.string(), yup.string(), yup.string(), yup.string(), yup.string())
    public async setIoTParameters(tokenId: string, vibration?: string, humidity?: string, speed?: string, longitude?: string, latitude?: string) {
        try {
            const token = await this.Ctx.ERC721Token.get(tokenId);
            const t = new RentableDeviceNFT(token);
            var msg = `RentableDevice Token ID : '${tokenId}' has been set with IoT parameters`;
            if (typeof vibration != 'undefined') {
                t.vibration = vibration;
            }
            if (typeof humidity != 'undefined') {
                t.humidity = humidity;
            }
            if (typeof speed != 'undefined') {
                t.speed = speed;
                t.lockingFlag = true;
            }
            if (typeof longitude != 'undefined') {
                t.longitude = longitude;
                t.lockingFlag = true;
            }
            if (typeof latitude != 'undefined') {
                t.latitude = latitude;
                t.lockingFlag = true;
            }
            await this.Ctx.ERC721Token.updateToken(t);
            msg = `RentableDevice Token ID : '${tokenId}' has been set with IoT parameters`;
            return { msg };
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    @Validator(yup.string())
    public async resetCustomParameters(tokenId: string) {
        try {
            const token = await this.Ctx.ERC721Token.get(tokenId);
            const t = new RentableDeviceNFT(token);
            var dateString = '1900-01-01T00:00:00';
            var resetDate = new Date(dateString);
            t.lockingFlag = false;
            t.bookingFlag = false;
            t.contractViolationFlag = false;
            t.actualEndTime = resetDate;
            t.bookingStartTime = resetDate;
            t.contractStartTime = resetDate;
            t.contractEndTime = resetDate;
            t.bookingAmount = 0;
            t.deductionAmount = 0;
            t.rentalAmount = 0;
            t.humidity = 'NULL';
            t.latitude = 'NULL';
            t.longitude = 'NULL';
            t.speed = 'NULL';
            t.vibration = 'NULL';
            await this.Ctx.ERC721Token.updateToken(t);
            var msg = `RentableDevice Token ID : '${tokenId}' has contract end time :' ${t.contractEndTime} `;
            return { msg };
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    @Validator(yup.string(), yup.number())
    public async getTokenHistoryByBookingId(tokenId: string, bookingId: number) {
        try {
            var histArray = await this.Ctx.ERC721Token.history(tokenId);
            const arr1 = histArray.filter(d => d.value.bookingId === bookingId);
            return arr1;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
