import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/ui/Header';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { Bell, CheckCircle, Clock, XCircle, Filter, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Notifications: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'done' | 'snoozed'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  // Filter notifications based on status
  const filteredNotifications = state.notifications.filter(notification => {
    return statusFilter === 'all' || notification.status === statusFilter;
  });
  
  // Sort notifications by date, newest first
  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  // Get icon and color for notification type
  const getNotificationTypeInfo = (type: string) => {
    switch (type) {
      case 'vaccination':
        return {
          variant: 'info' as const,
          label: 'Vaccination',
          icon: <CheckCircle size={18} />
        };
      case 'breeding':
        return {
          variant: 'primary' as const,
          label: 'Breeding',
          icon: <Filter size={18} />
        };
      case 'health':
        return {
          variant: 'warning' as const,
          label: 'Health',
          icon: <XCircle size={18} />
        };
      default:
        return {
          variant: 'secondary' as const,
          label: 'General',
          icon: <Bell size={18} />
        };
    }
  };
  
  // Mark notification as done
  const markAsDone = (id: string) => {
    dispatch({
      type: 'UPDATE_NOTIFICATION_STATUS',
      payload: { id, status: 'done' }
    });
  };
  
  // Snooze notification
  const snoozeNotification = (id: string) => {
    dispatch({
      type: 'UPDATE_NOTIFICATION_STATUS',
      payload: { id, status: 'snoozed' }
    });
  };
  
  // Navigate to related item
  const navigateToRelated = (notification: typeof state.notifications[0]) => {
    if (notification.relatedId) {
      switch (notification.type) {
        case 'vaccination':
        case 'health':
          navigate(`/health/${notification.relatedId}`);
          break;
        case 'breeding':
          navigate(`/breeding/${notification.relatedId}`);
          break;
        default:
          break;
      }
    }
  };
  
  // Summary counts
  const pendingCount = state.notifications.filter(n => n.status === 'pending').length;
  const doneCount = state.notifications.filter(n => n.status === 'done').length;
  const snoozedCount = state.notifications.filter(n => n.status === 'snoozed').length;

  // Toggle notification expansion
  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Notifications" />
      
      <main className="flex-grow p-4 md:p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
              <p className="text-gray-500 text-sm">
                {statusFilter === 'all' && `Showing all ${state.notifications.length} notifications`}
                {statusFilter === 'pending' && `Showing ${pendingCount} pending notifications`}
                {statusFilter === 'done' && `Showing ${doneCount} completed notifications`}
                {statusFilter === 'snoozed' && `Showing ${snoozedCount} snoozed notifications`}
              </p>
            </div>
            
            <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200 p-1">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  statusFilter === 'all' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setStatusFilter('all')}
              >
                All ({state.notifications.length})
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  statusFilter === 'pending' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setStatusFilter('pending')}
              >
                Pending ({pendingCount})
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  statusFilter === 'snoozed' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setStatusFilter('snoozed')}
              >
                Snoozed ({snoozedCount})
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  statusFilter === 'done' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setStatusFilter('done')}
              >
                Done ({doneCount})
              </motion.button>
            </div>
          </div>
          
          {/* Notifications List */}
          <Card className="overflow-hidden">
            <AnimatePresence>
              {sortedNotifications.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {sortedNotifications.map((notification) => {
                    const typeInfo = getNotificationTypeInfo(notification.type);
                    const isExpanded = expandedId === notification.id;
                    
                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className={`p-4 hover:bg-gray-50 transition-colors ${
                          notification.status === 'done' ? 'bg-gray-50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`p-2 rounded-full bg-${typeInfo.variant}-100 mt-1`}>
                            {React.cloneElement(typeInfo.icon, { 
                              className: `text-${typeInfo.variant}-600` 
                            })}
                          </div>
                          
                          <div 
                            className="flex-grow cursor-pointer" 
                            onClick={() => toggleExpand(notification.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <h3 className="font-medium text-gray-900">{notification.title}</h3>
                                <Badge 
                                  variant={typeInfo.variant} 
                                  className="ml-2"
                                >
                                  {typeInfo.label}
                                </Badge>
                                
                                {notification.status === 'snoozed' && (
                                  <Badge variant="warning" className="ml-2">
                                    Snoozed
                                  </Badge>
                                )}
                              </div>
                              
                              <motion.div
                                animate={{ rotate: isExpanded ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronRight size={18} className="text-gray-400" />
                              </motion.div>
                            </div>
                            
                            <p className="text-gray-600 mt-1">{notification.description}</p>
                            
                            <div className="text-sm text-gray-500 mt-2">
                              {new Date(notification.date).toLocaleString()}
                            </div>
                            
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="mt-3"
                                >
                                  {notification.details && (
                                    <div className="bg-gray-50 p-3 rounded text-sm text-gray-700">
                                      {notification.details}
                                    </div>
                                  )}
                                  <div className="mt-2">
                                    <Button
                                      variant="text"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        navigateToRelated(notification);
                                      }}
                                    >
                                      View Details
                                    </Button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          
                          {notification.status === 'pending' && (
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button
                                variant="success"
                                size="sm"
                                icon={<CheckCircle size={16} />}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsDone(notification.id);
                                }}
                              >
                                Done
                              </Button>
                              
                              <Button
                                variant="warning"
                                size="sm"
                                icon={<Clock size={16} />}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  snoozeNotification(notification.id);
                                }}
                              >
                                Snooze
                              </Button>
                            </div>
                          )}
                          
                          {notification.status === 'done' && (
                            <div className="p-2">
                              <CheckCircle size={20} className="text-green-500" />
                            </div>
                          )}
                          
                          {notification.status === 'snoozed' && (
                            <Button
                              variant="primary"
                              size="sm"
                              icon={<Bell size={16} />}
                              onClick={(e) => {
                                e.stopPropagation();
                                dispatch({
                                  type: 'UPDATE_NOTIFICATION_STATUS',
                                  payload: { id: notification.id, status: 'pending' }
                                });
                              }}
                            >
                              Activate
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-16"
                >
                  <Bell size={48} className="text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    {state.notifications.length === 0 
                      ? "You're all caught up!"
                      : "No notifications match the selected filter"}
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    {state.notifications.length === 0 
                      ? "You don't have any notifications at the moment. Check back later!"
                      : "Try selecting a different filter to see more notifications."}
                  </p>
                  
                  {state.notifications.length > 0 && statusFilter !== 'all' && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-6"
                    >
                      <Button
                        variant="primary"
                        onClick={() => setStatusFilter('all')}
                      >
                        View All Notifications
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Notifications;