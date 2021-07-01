import express from 'express'
import customerService from '../services/customers.service'

class CustomerController {
    async getAllCustomers(req: express.Request, res: express.Response) {
        // limiting number of resources with default value or user defined value
        let limit = req?.query?.limit || 10
        let page = req?.query?.page || 1

        // Converting query parameters from string to number
        limit = +limit
        page = +page

        const customers = await customerService.getAll(limit, page)
        res.status(200).json(customers)
    }

    async getCustomerById(req: express.Request, res: express.Response) {
        const customer = await customerService.getById(req.params.customerId)
        res.status(200).json(customer)
    }

    async createCustomer(req: express.Request, res: express.Response) {
        const userId = await customerService.create(req.body)
        res.status(201).json({ id: userId })
    }


    async patch(req: express.Request, res: express.Response) {
        await customerService.patchById(req.params.customerId, req.body)
        res.status(204).json()
    }

    async put(req: express.Request, res: express.Response) {
        await customerService.putById(req.params.customerId, req.body)
        res.status(204).json()
    }

    async deleteCustomer(req: express.Request, res: express.Response) {
        await customerService.deleteById(req.params.customerId)
        res.status(204).json()
    }
}

export default new CustomerController()