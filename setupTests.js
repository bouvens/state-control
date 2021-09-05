import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

const context = require.context('./src', true, /\.test\.js$/);

context.keys().forEach(context);
