import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SkillsSelection = ({ skillCategories, selectedSkills, onSkillToggle, onPriorityChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCategories = skillCategories?.filter(category => {
    if (activeCategory !== 'all' && category?.id !== activeCategory) return false;
    if (searchTerm) {
      return category?.skills?.some(skill => 
        skill?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }
    return true;
  });

  const getSkillPriority = (skillId) => {
    const selected = selectedSkills?.find(s => s?.id === skillId);
    return selected?.priority || 'medium';
  };

  const isSkillSelected = (skillId) => {
    return selectedSkills?.some(s => s?.id === skillId);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground font-heading mb-2">Skills Selection</h2>
        <p className="text-sm text-muted-foreground">Choose skills you want to develop and set priorities</p>
      </div>
      {/* Search and Filter */}
      <div className="space-y-4 mb-6">
        <Input
          type="search"
          placeholder="Search skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="w-full"
        />

        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory('all')}
          >
            All Categories
          </Button>
          {skillCategories?.map((category) => (
            <Button
              key={category?.id}
              variant={activeCategory === category?.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(category?.id)}
            >
              {category?.name}
            </Button>
          ))}
        </div>
      </div>
      {/* Skills Grid */}
      <div className="space-y-6">
        {filteredCategories?.map((category) => (
          <div key={category?.id} className="space-y-3">
            <div className="flex items-center space-x-2">
              <Icon name={category?.icon} size={20} className="text-primary" />
              <h3 className="font-medium text-foreground">{category?.name}</h3>
              <span className="text-sm text-muted-foreground">
                ({category?.skills?.filter(skill => isSkillSelected(skill?.id))?.length}/{category?.skills?.length})
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {category?.skills?.filter(skill => 
                  !searchTerm || skill?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
                )?.map((skill) => {
                  const selected = isSkillSelected(skill?.id);
                  const priority = getSkillPriority(skill?.id);

                  return (
                    <div
                      key={skill?.id}
                      className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                        selected
                          ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
                      }`}
                      onClick={() => onSkillToggle(skill?.id, skill?.name, category?.name)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground text-sm">{skill?.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{skill?.description}</p>
                        </div>
                        <div className="flex items-center space-x-1 ml-2">
                          {selected && (
                            <Icon name="Check" size={16} className="text-primary" />
                          )}
                        </div>
                      </div>
                      {selected && (
                        <div className="flex items-center space-x-2 mt-3 pt-2 border-t border-border/50">
                          <span className="text-xs text-muted-foreground">Priority:</span>
                          <div className="flex space-x-1">
                            {['low', 'medium', 'high']?.map((level) => (
                              <button
                                key={level}
                                onClick={(e) => {
                                  e?.stopPropagation();
                                  onPriorityChange(skill?.id, level);
                                }}
                                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                                  priority === level
                                    ? level === 'high' ?'bg-error text-error-foreground'
                                      : level === 'medium' ?'bg-warning text-warning-foreground' :'bg-success text-success-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
                                }`}
                              >
                                {level}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>{skill?.estimatedTime}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Icon name="TrendingUp" size={12} />
                          <span>{skill?.difficulty}</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
      {selectedSkills?.length > 0 && (
        <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border/50">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-foreground">Selected Skills ({selectedSkills?.length})</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => selectedSkills?.forEach(skill => onSkillToggle(skill?.id))}
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedSkills?.map((skill) => (
              <div
                key={skill?.id}
                className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                  skill?.priority === 'high' ?'bg-error/10 text-error'
                    : skill?.priority === 'medium' ?'bg-warning/10 text-warning' :'bg-success/10 text-success'
                }`}
              >
                <span>{skill?.name}</span>
                <button
                  onClick={() => onSkillToggle(skill?.id)}
                  className="hover:bg-black/10 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsSelection;