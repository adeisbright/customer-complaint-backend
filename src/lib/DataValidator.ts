class DataValidator {
    validateEmail = (val: string): boolean => {
        const emailPattern =
            /^[a-zA-Z]+((\d+|_+|\.)?([a-zA-Z]+|\d+)*)+@[a-zA-Z]{3,}\.[a-zA-Z]{2,6}$/;
        try {
            if (String(val).match(emailPattern)) {
                return true;
            }
            return false;
        } catch (err) {
            return false;
        }
    };

    validateMobile = (val: string): boolean => {
        const firstPattern = /^(\+234|0)[8]{1}[0|1]{1}[0-9]{8}$/;
        const secondPattern = /^(\+234|0)[7 | 9]{1}[0]{1}[0-9]{8}$/;
        const thirdPattern = /^(\+234|0)[8]{1}[0|1]{1}[0-9]{8}$/;
        const fourthPattern = /^(\+234|0)[7 | 9]{1}[0]{1}[0-9]{8}$/;
        try {
            if (
                String(val).match(firstPattern) ||
                String(val).match(secondPattern) ||
                String(val).match(thirdPattern) ||
                String(val).match(fourthPattern)
            ) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    };
}

export default new DataValidator();
