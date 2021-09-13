import React, { Component } from 'react'
import { CardElement, injectStripe, Elements, StripeProvider } from 'react-stripe-elements'
import { Button, Container, Divider, Item, Message } from 'semantic-ui-react'
import { authAxios } from '../utils'
import { checkoutURL } from '../constants'

class OrderPreview extends Component {
    render() {
        return (
            <Item.Group relaxed>
                <Item>
                    <Item.Image size='tiny' src='/images/wireframe/image.png' />

                    <Item.Content verticalAlign='middle'>
                        <Item.Header as='a'>12 Years a Slave</Item.Header>
                    </Item.Content>
                </Item>

                <Item>
                    <Item.Image size='tiny' src='/images/wireframe/image.png' />

                    <Item.Content verticalAlign='middle'>
                        <Item.Header as='a'>My Neighbor Totoro</Item.Header>
                    </Item.Content>
                </Item>

                <Item>
                    <Item.Image size='tiny' src='/images/wireframe/image.png' />

                    <Item.Content verticalAlign='middle'>
                        <Item.Header as='a'>Watchmen</Item.Header>
                    </Item.Content>
                </Item>
            </Item.Group>
        )
    }
}

class CheckoutForm extends Component {
    state = {
        loading: false,
        error: null,
        success: false
    }

    submit = ev => {
        ev.preventDefault()
        this.setState({ loading: true })
        if (this.props.stripe) {
            this.props.stripe.createToken().then(result => {
                if (result.error) {
                    this.setState({ error: result.error.message, loading: false })
                } else {
                    authAxios
                        .post(checkoutURL, { stripeToken: result.token.id })
                        .then(res => {
                            this.setState({ loading: false, success: true })
                        }).catch(err => {
                            this.setState({ loading: false, error: err })
                        })
                }
            })
        } else {
            console.log("Stripe is not loaded.")
        }
    }

    render() {
        const { error, loading, success } = this.state
        return (
            <div>
                {error && <Message negative>
                    <Message.Header>Your payment was unsuccessful</Message.Header>
                    <p>{JSON.stringify(error)}</p>
                </Message>}
                {success && <Message positive>
                    <Message.Header>Your payment was successful</Message.Header>
                    <p>Go to your <b>profile</b> to see the order delivery status.</p>
                </Message>}

                <OrderPreview />
                <Divider />

                <p>Would you like to complete the purchase?</p>
                <CardElement />
                <Button loading={loading} disabled={loading} primary onClick={this.submit} style={{ marginTop: "10px" }}>Submit</Button>
            </div>

        )
    }
}

const InjectForm = injectStripe(CheckoutForm)

const WrappedForm = () => (
    <Container text>
        <StripeProvider apiKey="pk_test_51IigYXLSby8TvzF0lt34zHiq4HXwucFyrAc2Xvw5NaoexsMyoKMTU7IhINMTCy8doMJIcT540QTlcCP8vtmRxT9600kkGFpK8S">
            <div>
                <h1>Complete your order</h1>
                <Elements>
                    <InjectForm />
                </Elements>
            </div>
        </StripeProvider>
    </Container>
)

export default WrappedForm
