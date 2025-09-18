import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const MentorshipMatching = ({ mentors, onConnectMentor, onViewProfile }) => {
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('match');

  const filterTypes = [
    { id: 'all', label: 'All Mentors' },
    { id: 'teachers', label: 'Teachers' },
    { id: 'peers', label: 'Peer Mentors' },
    { id: 'industry', label: 'Industry Experts' }
  ];

  const sortOptions = [
    { id: 'match', label: 'Best Match' },
    { id: 'rating', label: 'Highest Rated' },
    { id: 'availability', label: 'Most Available' }
  ];

  const filteredMentors = mentors?.filter(mentor => filterType === 'all' || mentor?.type === filterType)?.sort((a, b) => {
      if (sortBy === 'match') return b?.matchScore - a?.matchScore;
      if (sortBy === 'rating') return b?.rating - a?.rating;
      if (sortBy === 'availability') return a?.responseTime - b?.responseTime;
      return 0;
    });

  const renderMentorCard = (mentor) => (
    <div key={mentor?.id} className="bg-muted/30 rounded-lg p-4 border border-border/50 hover:border-primary/50 transition-all duration-200">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={mentor?.avatar}
              alt={mentor?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-card ${
            mentor?.isOnline ? 'bg-success' : 'bg-muted-foreground'
          }`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-medium text-foreground">{mentor?.name}</h4>
              <p className="text-sm text-muted-foreground">{mentor?.title}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                mentor?.matchScore >= 90
                  ? 'bg-success/10 text-success'
                  : mentor?.matchScore >= 70
                  ? 'bg-warning/10 text-warning' :'bg-muted text-muted-foreground'
              }`}>
                {mentor?.matchScore}% match
              </span>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={12} className="text-warning fill-current" />
                <span className="text-sm font-medium text-foreground">{mentor?.rating}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{mentor?.bio}</p>

          <div className="flex flex-wrap gap-2 mb-3">
            {mentor?.expertise?.slice(0, 3)?.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {mentor?.expertise?.length > 3 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                +{mentor?.expertise?.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={14} />
                <span>{mentor?.mentees} mentees</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>Responds in {mentor?.responseTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} />
                <span>{mentor?.location}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={`w-2 h-2 rounded-full ${
                mentor?.availability === 'available' ?'bg-success' 
                  : mentor?.availability === 'busy' ?'bg-warning' :'bg-error'
              }`} />
              <span className="text-sm text-muted-foreground capitalize">
                {mentor?.availability}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewProfile(mentor?.id)}
              >
                View Profile
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onConnectMentor(mentor?.id)}
                disabled={mentor?.availability === 'unavailable'}
              >
                {mentor?.isConnected ? 'Connected' : 'Connect'}
              </Button>
            </div>
          </div>

          {mentor?.nextAvailable && (
            <div className="mt-3 pt-3 border-t border-border/50">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Calendar" size={14} />
                <span>Next available: {mentor?.nextAvailable}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={20} className="text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-foreground font-heading">Mentorship Matching</h2>
            <p className="text-sm text-muted-foreground">Connect with mentors based on your skills and goals</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" iconName="Filter">
            Advanced Filters
          </Button>
          <Button variant="outline" iconName="RefreshCw">
            Refresh Matches
          </Button>
        </div>
      </div>
      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {filterTypes?.map((type) => (
            <Button
              key={type?.id}
              variant={filterType === type?.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType(type?.id)}
            >
              {type?.label}
            </Button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-1 bg-card border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {sortOptions?.map((option) => (
              <option key={option?.id} value={option?.id}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* AI Matching Insights */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Icon name="Sparkles" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-foreground mb-1">AI Matching Insights</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Based on your selected skills and learning goals, we've found {filteredMentors?.length} potential mentors. 
              Top matches are prioritized by skill alignment, availability, and teaching style compatibility.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                React Development: 5 matches
              </span>
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                UI/UX Design: 3 matches
              </span>
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                Data Science: 2 matches
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Mentors List */}
      <div className="space-y-4">
        {filteredMentors?.length > 0 ? (
          filteredMentors?.map(renderMentorCard)
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Users" size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No Mentors Found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or updating your skills to find better matches
            </p>
            <Button variant="outline">
              Update Skills Profile
            </Button>
          </div>
        )}
      </div>
      {filteredMentors?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="Info" size={16} />
              <span>Mentorship matching updates weekly based on your progress and feedback</span>
            </div>
            <Button variant="ghost" size="sm">
              View All Mentors ({mentors?.length})
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorshipMatching;