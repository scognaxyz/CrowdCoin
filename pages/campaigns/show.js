import React, {Component} from 'react';
import web3 from '../../ethereum/web3';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';




class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();

        return{
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestCount: summary [2],
            approversCount: summary [3],
            manager: summary[4]
        };
    }

    renderCards () {

    const {
        balance,
        manager,
        minimumContribution,
        requestCount,
        approversCount
    }= this.props;

        const items = [
            {
                header: manager,
                meta: 'manager address',
                description: 'Manager created this campaign and he can create requests to withdraw money',
                style: {overflowWrap: 'break-word'}
            },
            {   
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'Ethers left to spend in the campaign balance'
            },
            {   
                header: minimumContribution,
                meta: 'Minimum contribution (wei)',
                description: 'You must contribute at least this much wei to become an approver'
            },
            {   
                header: requestCount,
                meta: 'Number of request',
                description: 'A request tries to withdraw money from the contract. Request must be approved by approvers'
            },
            {   
                header: approversCount,
                meta: 'Number of approvers',
                description: 'The number of people who have alredy donated to this campaign'
            }
        ]
        return <Card.Group items={items} />
    }
    render() {
        return (
            <Layout>
                <h3>Campaign Details</h3>
                <Grid>
                    <Grid.Row>
                    <Grid.Column width={10}>
                        {this.renderCards()}
                    </Grid.Column>

                    <Grid.Column width={6}>
                        <ContributeForm address={this.props.address}/>
                    </Grid.Column>
                   </Grid.Row>

                   <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>View request</Button>
                                </a>
                            </Link>
                         </Grid.Column>
                   </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}

export default CampaignShow;