import React from 'react'
import { Button, Container, Header, Label, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { orderSummaryURL } from '../constants'
import { authAxios } from "../utils"

class OrderSummary extends React.Component {

    state = {
        data: null,
        error: null,
        loading: false
    }

    componentDidMount() {
        this.handleFetchOrder()
    }

    handleFetchOrder = () => {
        this.setState({ loading: true })
        authAxios
            .get(orderSummaryURL)
            .then(res => {
                this.setState({ data: res.data, loading: false })
            })
            .catch(err => {
                if (err.response.status === 404) {
                    console.log(err.response)
                    this.setState({ error: "You currently do not have an order", loading: false })
                } else {
                    this.setState({ error: err, loading: true })
                }
            })
    }

    render() {
        const { data, error, loading } = this.state
        return (
            <Container>
                <Header as='h3'>Order Summary</Header>
                {data &&
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Item #</Table.HeaderCell>
                                <Table.HeaderCell>Item name</Table.HeaderCell>
                                <Table.HeaderCell>Item price</Table.HeaderCell>
                                <Table.HeaderCell>Item quantity</Table.HeaderCell>
                                <Table.HeaderCell>Total item price</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {data.order_items.map((order_item, i) => {
                                return (
                                    <Table.Row key={order_item.id}>
                                        <Table.Cell>{i + 1}</Table.Cell>
                                        <Table.Cell>{order_item.item}</Table.Cell>
                                        <Table.Cell>???{order_item.item_obj.price}</Table.Cell>
                                        <Table.Cell>{order_item.quantity}</Table.Cell>
                                        <Table.Cell>
                                            {order_item.item_obj.discount_price && (
                                                <Label color="green" ribbon>ON DISCOUNT</Label>
                                            )}
                                            ???{order_item.final_price}
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })}
                            <Table.Row>
                                <Table.Cell />
                                <Table.Cell />
                                <Table.Cell />
                                <Table.Cell colSpan='2' textAlign="center">
                                    Total: ???{data.total}
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>

                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='5'>
                                    <Link to="/checkout">
                                        <Button floated="right" color="yellow">Checkout</Button>
                                    </Link>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                }
            </Container>
        )
    }
}

export default OrderSummary