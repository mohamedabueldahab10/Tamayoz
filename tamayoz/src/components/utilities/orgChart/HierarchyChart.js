import React, { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
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
        },
      ],
    },
  ],
};
const OrgNode = ({ node, expandedNodes, setExpandedNodes, isRoot }) => {
  const isVisible = isRoot || expandedNodes === node.id;
  const hasChildren = node.children && node.children.length > 0;

  const toggleVisibility = () => {
    if (!hasChildren) return;
    setExpandedNodes(expandedNodes === node.id ? null : node.id);
  };

  return (
    <div className="node">
      <div
        onClick={toggleVisibility}
        style={{ cursor: hasChildren ? 'pointer' : 'default' }}
      >
        {hasChildren && (
          <> {isVisible ? <ArrowDropDownIcon /> : <ArrowRightIcon />}</>
        )}
        {node.name}
      </div>
      {isVisible && hasChildren && (
        <div className="org-node-container">
          {node.children.map((child) => (
            <OrgNode
              key={child.id}
              node={child}
              expandedNodes={expandedNodes}
              setExpandedNodes={setExpandedNodes}
              isRoot={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};
const OrgChart = () => {
  const [expandedNodeId, setExpandedNodeId] = useState(initialData.id);
  return (
    <div className="chart-container">
      <h1>Organizational Chart</h1>
      <OrgNode
        node={initialData}
        expandedNodes={expandedNodeId}
        setExpandedNodes={setExpandedNodeId}
        isRoot={true}
      />
    </div>
  );
};
export default OrgChart;
