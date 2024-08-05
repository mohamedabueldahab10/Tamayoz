import React, { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import './chart.css';
import { CardActions, CardContent, Tooltip, Typography } from '@mui/material';

export const initialHierarchyData = {
  id: '1',
  name: 'Mitchell Admin',
  job: 'Chief Executive Officer',
  department: 'Management',
  departmentColor: '#8e44ad',
  image: 'https://via.placeholder.com/150',
  children: [
    {
      id: '2',
      name: 'Jeffrey Kelly',
      job: 'Marketing and Community Manager',
      department: 'Management / Sales',
      departmentColor: '#e74c3c',
      image: 'https://via.placeholder.com/150',

      children: [
        {
          id: '6',
          name: 'Doris Cole',
          job: 'Consultant',
          department: 'Dept 6',
          departmentColor: '#f1c40f',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: '7',
          name: 'Ernest Reed',
          job: 'Consultant',
          department: 'Dept 7',
          departmentColor: '#f1c40f',
          image: 'https://via.placeholder.com/150',
        },
      ],
    },
    {
      id: '3',
      name: 'Marc Demo',
      job: 'Experienced Developer',
      department: 'Management / Research & Development',
      departmentColor: '#27ae60',
      image: 'https://via.placeholder.com/150',
      children: [
        {
          id: '18',
          name: 'Child 18',
          job: 'Job 18',
          department: 'Dept 18',
          departmentColor: '#3498db',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: '16',
          name: 'Child 16',
          job: 'Job 16',
          department: 'Dept 16',
          departmentColor: '#3498db',
          image: 'https://via.placeholder.com/150',
        },
      ],
    },
    {
      id: '5',
      name: 'Tina Williamson',
      job: 'Human Resources Manager',
      department: 'Management / Administration',
      departmentColor: '#2980b9',
      image: 'https://via.placeholder.com/150',
      children: [
        {
          id: '11',
          name: 'Child 11',
          job: 'Job 11',
          department: 'Dept 11',
          departmentColor: '#9b59b6',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: '12',
          name: 'Child 12',
          job: 'Job 12',
          department: 'Dept 12',
          departmentColor: '#9b59b6',
          image: 'https://via.placeholder.com/150',

          children: [
            {
              id: '21',
              name: 'Child 21',
              job: 'Job 11',
              department: 'Dept 11',
              departmentColor: '#9b59b6',
              image: 'https://via.placeholder.com/150',
              children: [
                {
                  id: '40',
                  name: 'Child 40',
                  job: 'Job 40',
                  department: 'Dept 40',
                  departmentColor: '#9b59b6',
                  image: 'https://via.placeholder.com/150',
                },
                {
                  id: '41',
                  name: 'Child 41',
                  job: 'Job 41',
                  department: 'Dept 41',
                  departmentColor: '#9b59b6',
                  image: 'https://via.placeholder.com/150',
                },
              ],
            },
            {
              id: '32',
              name: 'Child 32',
              job: 'Job 12',
              department: 'Dept 12',
              departmentColor: '#9b59b6',
              image: 'https://via.placeholder.com/150',
            },
          ],
        },
      ],
    },
  ],
};
const OrgChart = () => {
  const [expandedNodes, setExpandedNodes] = useState(
    new Set([initialHierarchyData.id])
  );

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
              width: '250px',
              maxWidth: '300px',
              height: '150px',
            }}
          >
            <Tooltip title={node.department}>
              <CardHeader
                sx={{
                  width: '100%',
                  padding: '5px',
                  backgroundColor: `${node.departmentColor}`,
                  display: 'grid',
                  placeItems: 'center',
                }}
                avatar={
                  <Avatar aria-label="recipe">
                    <CardMedia
                      component="img"
                      image={node.image}
                      alt="Paella dish"
                    />
                  </Avatar>
                }
              />
            </Tooltip>
            <CardContent
              sx={{
                backgroundColor: '#f4f4f4',
                width: '100%',
                display: 'grid',
                placeItems: 'center',
                gap: '0',
                padding: '5px',
                margin: '0',
              }}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                color="textSecondary"
                component="p"
              >
                {node.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {node.job}
              </Typography>
            </CardContent>
            <CardActions
              disableSpacing
              sx={{
                width: '100%',
                padding: '0',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <IconButton
                sx={{
                  '&:hover': { backgroundColor: 'transparent' },
                }}
              >
                {hasChildren && (
                  <>
                    {isVisible ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
                    <Typography
                      fontWeight="bold"
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {node.children.length} People
                    </Typography>
                  </>
                )}
              </IconButton>
            </CardActions>
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
      <OrgNode node={initialHierarchyData} isRoot={true} />
    </div>
  );
};

export default OrgChart;
