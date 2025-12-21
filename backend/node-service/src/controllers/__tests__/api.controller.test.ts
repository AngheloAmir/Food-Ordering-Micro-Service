import { Request, Response } from 'express';
import { getHello, getTest } from '../_testControllers';

describe('API Controllers', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let responseObject: any;

    beforeEach(() => {
        mockRequest = {};
        responseObject = {};
        mockResponse = {
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
                return mockResponse;
            }),
            status: jest.fn().mockReturnThis(),
        };
    });

    describe('getHello', () => {
        test('should return hello message', () => {
            getHello(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.json).toHaveBeenCalledTimes(1);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Hello World from Node.js with TypeScript!'
            });
        });
    });

    describe('getTest', () => {
        test('should return test message and timestamp', () => {
            getTest(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.json).toHaveBeenCalledTimes(1);
            expect(responseObject).toHaveProperty('message', 'This is a test endpoint');
            expect(responseObject).toHaveProperty('timestamp');
        });
    });
});
