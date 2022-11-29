import web3 from './web3';
import CampaignFactory  from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x7d83C301F398F661C9783F6F7FB85Fc6c04E6C3E'
);

export default instance;