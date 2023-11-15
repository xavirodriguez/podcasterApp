import { Link } from 'react-router-dom';
import styled from 'styled-components';

/**
 * UnstlyedLink used to be inside PodcastDescription but it was moved out to increase reusability
 * Therefore, the general rule is:
 *  If a component is not used anywhere else than in the component it is defined in,
 *    then it should be defined inside that component (standard styled-component)
 *  If a component is used in multiple places, then it should be defined in the Styled folder
 */
const UnstyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export default UnstyledLink;
