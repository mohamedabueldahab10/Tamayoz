import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  styled,
  Badge,
  IconButton,
} from '@mui/material';

const StyledListItem = styled(ListItem)(() => ({
  width: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  paddingLeft: '10px',
  minWidth: '300px',
  backgroundColor: 'var(--btn-bg-color)',
  borderRadius: '5px',
}));

const ParentListItem = styled(ListItem)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: '10px',
  minWidth: '310px',
}));

const ChildrenList = styled(List)(() => ({
  width: '100%',
  paddingLeft: '30px',
  position: 'relative',
  '&:before': {
    content: '""',
    height: '100%',
    position: 'absolute',
    top: -30,
    left: 0,
    bottom: 0,
    transform: 'translate(0%, 0%)',
    borderLeft: '3px solid var(--primary-color)',
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    top: -30,
    left: 0,
    width: 10,
    borderTop: '3px solid var(--primary-color)',
  },
}));

const CustomTreeView = ({ data }) => {
  const renderList = (nodes) => (
    <StyledListItem key={nodes.id} disableGutters>
      <ParentListItem
        secondaryAction={
          <IconButton aria-label="comment">
            <Badge
              badgeContent={nodes.reports}
              color="success"
              sx={{
                // marginLeft: 2,
                backgroundColor: 'var(--primary-color)',
                color: 'var(--primary-color)',
              }}
            />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar alt={nodes.name} src={nodes.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={<Typography variant="body2">{nodes.name}</Typography>}
          secondary={<Typography variant="body2">{nodes.role}</Typography>}
        />
      </ParentListItem>
      {Array.isArray(nodes.children) && (
        <ChildrenList component="div" disablePadding>
          {nodes.children.map((node) => renderList(node))}
        </ChildrenList>
      )}
    </StyledListItem>
  );

  return <List>{renderList(data)}</List>;
};
export default CustomTreeView;
