const controller = require('./github.controller');

describe('Controller', () => {
    const date = '2020-01-01';
    const language = 'C++';
    const page = 10;
    let validData, dataWithDate, invalidData;
    describe('Valid data', () => {
        beforeAll(async () => {
            validData = await controller.getGithubRepositories(date, language, page);
            dataWithDate = await controller.getGithubRepositories(date);
        })
        it('Returns object',  () => {

            expect(typeof validData === 'object').toBe(true);
            expect(Array.isArray(validData)).toBe(false);
        })
        it('Data structure', () => {
            expect(Object.keys(validData)).toStrictEqual(["status", "response"]);
            expect(typeof validData.status === 'number').toBe(true);
            expect(Array.isArray(validData.response)).toBe(true);
        })
        it('Valid Data status must be 200', () => {
            expect(validData.status === 200).toBe(true);
            expect(dataWithDate.status === 200).toBe(true);
        })
        it('Response items count is like {page} or default (30)', () => {
            expect(validData.response.length === 10).toBe(true);
            expect(dataWithDate.response.length === 30).toBe(true);
        })

        it('Response items structure', () => {
            const keys = Object.keys(validData.response[0]);
            const ownerKeys = Object.keys(validData.response[0].owner);
            expect(keys).toStrictEqual([
                    'id',
                    'name',
                    'git_url',
                    'owner',
                    'created_at',
                    'updated_at',
                    'pushed_at',
                    'stargazers_count',
                    'language'
                ]
            )
            expect(ownerKeys).toStrictEqual( [ 'id', 'login', 'avatar_url' ])
        })
    })

    describe('Invalid Data', () => {
        beforeAll(async () => {
            invalidData = await controller.getGithubRepositories();
        })

        it('Returns object same as valid Data',  () => {

            expect(typeof invalidData === 'object').toBe(true);
            expect(Array.isArray(invalidData)).toBe(false);
        })

        it('Data structure', () => {
            expect(Object.keys(invalidData)).toStrictEqual(["status", "response"]);
            expect(typeof invalidData.status === 'number').toBe(true);
            expect(typeof invalidData.response === 'string').toBe(true);
        })

        it('Invalid data status is not 200', () => {
            expect(invalidData.status !== 200).toBe(true);
        })
    })
})