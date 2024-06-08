import React, { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './chart.css';

const initialData = {
  id: '1',
  name: 'Mitchell Admin',
  job: 'Chief Executive Officer',
  department: 'Management',
  departmentColor: '#8e44ad', // Purple color
  image: 'https://via.placeholder.com/150', // Placeholder image URL
  presenceState: 'present',
  collapsed: true,
  children: [
    {
      id: '2',
      name: 'Jeffrey Kelly',
      job: 'Marketing and Community Manager',
      department: 'Management / Sales',
      departmentColor: '#e74c3c', // Red color
      image: 'https://via.placeholder.com/150',
      presenceState: 'present',
      children: [
        {
          id: '6',
          name: 'Doris Cole',
          job: 'Consultant',
          department: 'Dept 6',
          departmentColor: '#f1c40f',
          image: 'https://via.placeholder.com/150',
          presenceState: 'present',
        },
        {
          id: '7',
          name: 'Ernest Reed',
          job: 'Consultant',
          department: 'Dept 7',
          departmentColor: '#f1c40f',
          image: 'https://via.placeholder.com/150',
          presenceState: 'present',
        },
      ],
    },
    {
      id: '3',
      name: 'Marc Demo',
      job: 'Experienced Developer',
      department: 'Management / Research & Development',
      departmentColor: '#27ae60', // Green color
      image: 'https://via.placeholder.com/150',
      presenceState: 'absent',
      children: [
        {
          id: '18',
          name: 'Child 18',
          job: 'Job 18',
          department: 'Dept 18',
          departmentColor: '#3498db',
          image: 'https://via.placeholder.com/150',
          presenceState: 'present',
        },
        {
          id: '16',
          name: 'Child 16',
          job: 'Job 16',
          department: 'Dept 16',
          departmentColor: '#3498db',
          image: 'https://via.placeholder.com/150',
          presenceState: 'present',
        },
      ],
    },
    {
      id: '5',
      name: 'Tina Williamson',
      job: 'Human Resources Manager',
      department: 'Management / Administration',
      departmentColor: '#2980b9', // Blue color
      image: 'https://via.placeholder.com/150',
      presenceState: 'present',
      children: [
        {
          id: '11',
          name: 'Child 11',
          job: 'Job 11',
          department: 'Dept 11',
          departmentColor: '#9b59b6',
          image: 'https://via.placeholder.com/150',
          presenceState: 'present',
        },
        {
          id: '12',
          name: 'Child 12',
          job: 'Job 12',
          department: 'Dept 12',
          departmentColor: '#9b59b6',
          image: 'https://via.placeholder.com/150',
          presenceState: 'present',
          children: [
            {
              id: '21',
              name: 'Child 11',
              job: 'Job 11',
              department: 'Dept 11',
              departmentColor: '#9b59b6',
              image: 'https://via.placeholder.com/150',
              presenceState: 'present',
            },
            {
              id: '32',
              name: 'Child 12',
              job: 'Job 12',
              department: 'Dept 12',
              departmentColor: '#9b59b6',
              image: 'https://via.placeholder.com/150',
              presenceState: 'present',
            },
          ],
        },
      ],
    },
  ],
};
const OrgChart = () => {
  const [expandedNodes, setExpandedNodes] = useState(new Set([initialData.id]));

  const OrgNode = ({ node, isRoot }) => {
    // const isVisible = isRoot || expandedNodeId === node.id;
    const isVisible = expandedNodes.has(node.id);

    const hasChildren = node.children && node.children.length > 0;

    const toggleVisibility = () => {
      if (!hasChildren) return;
      const newExpandedNodes = new Set(expandedNodes);
      if (newExpandedNodes.has(node.id)) {
        newExpandedNodes.delete(node.id);
      } else {
        newExpandedNodes.add(node.id);
      }
      setExpandedNodes(newExpandedNodes);
    };

    return (
      <div className="node">
        <div
          onClick={toggleVisibility}
          style={{ cursor: hasChildren ? 'pointer' : 'default' }}
        >
          <Card
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'start',
              flexDirection: 'column',
              width: '200px',
              height: '150px',
              maxWidth: 345,
            }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  <CardMedia
                    component="img"
                    // height="194"
                    image={node.image}
                    alt="Paella dish"
                  />
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={node.name}
              subheader={node.job}
            />
            {hasChildren && (
              <> {isVisible ? <ArrowDropDownIcon /> : <ArrowRightIcon />}</>
            )}
          </Card>
        </div>
        {isVisible && hasChildren && (
          <div className="org-node-container">
            {node.children.map((child) => (
              <OrgNode key={child.id} node={child} isRoot={false} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="chart-container">
      <h1>Organizational Chart</h1>
      <OrgNode node={initialData} isRoot={true} />
    </div>
  );
};

export default OrgChart;
