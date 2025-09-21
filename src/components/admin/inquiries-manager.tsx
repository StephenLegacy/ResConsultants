import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Eye, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Search,
  Filter,
  Calendar,
  Mail,
  Phone,
  Building,
  User
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_interest?: string;
  message: string;
  preferred_contact_time?: string;
  status: 'new' | 'in_progress' | 'responded' | 'closed';
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export function InquiriesManager() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, []);

  useEffect(() => {
    filterInquiries();
  }, [inquiries, statusFilter, searchQuery]);

  const fetchInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading inquiries",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterInquiries = () => {
    let filtered = inquiries;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(inquiry => inquiry.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(inquiry =>
        inquiry.name.toLowerCase().includes(query) ||
        inquiry.email.toLowerCase().includes(query) ||
        inquiry.company?.toLowerCase().includes(query) ||
        inquiry.message.toLowerCase().includes(query)
      );
    }

    setFilteredInquiries(filtered);
  };

  const updateInquiryStatus = async (inquiryId: string, newStatus: 'new' | 'in_progress' | 'responded' | 'closed') => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ 
          status: newStatus,
          admin_notes: adminNotes || null 
        })
        .eq('id', inquiryId);

      if (error) throw error;

      // Update local state
      setInquiries(prev => prev.map(inquiry =>
        inquiry.id === inquiryId 
          ? { ...inquiry, status: newStatus as any, admin_notes: adminNotes || null }
          : inquiry
      ));

      toast({
        title: "Status updated",
        description: `Inquiry marked as ${newStatus.replace('_', ' ')}`,
      });

      setSelectedInquiry(null);
      setAdminNotes('');
    } catch (error: any) {
      toast({
        title: "Error updating status",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'responded':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'closed':
        return <XCircle className="h-4 w-4 text-gray-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'responded':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold mb-2">Inquiries Management</h2>
        <p className="text-muted-foreground">Manage customer inquiries and communication</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search inquiries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="responded">Responded</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inquiries List */}
      <div className="grid gap-4">
        {filteredInquiries.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {statusFilter === 'all' && !searchQuery 
                  ? 'No inquiries yet' 
                  : 'No inquiries match your filters'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredInquiries.map((inquiry) => (
            <Card key={inquiry.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(inquiry.status)}
                      <div>
                        <h3 className="font-semibold text-lg">{inquiry.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span>{inquiry.email}</span>
                          </div>
                          {inquiry.phone && (
                            <div className="flex items-center space-x-1">
                              <Phone className="h-3 w-3" />
                              <span>{inquiry.phone}</span>
                            </div>
                          )}
                          {inquiry.company && (
                            <div className="flex items-center space-x-1">
                              <Building className="h-3 w-3" />
                              <span>{inquiry.company}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground line-clamp-2">{inquiry.message}</p>

                    <div className="flex items-center space-x-2">
                      <Badge className={`text-xs ${getStatusColor(inquiry.status)}`}>
                        {inquiry.status.replace('_', ' ')}
                      </Badge>
                      {inquiry.service_interest && (
                        <Badge variant="outline" className="text-xs">
                          {inquiry.service_interest.replace('_', ' ')}
                        </Badge>
                      )}
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(inquiry.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedInquiry(inquiry);
                          setAdminNotes(inquiry.admin_notes || '');
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Inquiry Details</DialogTitle>
                        <DialogDescription>
                          View and manage this customer inquiry
                        </DialogDescription>
                      </DialogHeader>

                      {selectedInquiry && (
                        <Tabs defaultValue="details" className="space-y-4">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="details">Details</TabsTrigger>
                            <TabsTrigger value="manage">Manage</TabsTrigger>
                          </TabsList>

                          <TabsContent value="details" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                              <div>
                                <label className="text-sm font-medium">Name</label>
                                <p className="text-sm text-muted-foreground">{selectedInquiry.name}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Email</label>
                                <p className="text-sm text-muted-foreground">{selectedInquiry.email}</p>
                              </div>
                              {selectedInquiry.phone && (
                                <div>
                                  <label className="text-sm font-medium">Phone</label>
                                  <p className="text-sm text-muted-foreground">{selectedInquiry.phone}</p>
                                </div>
                              )}
                              {selectedInquiry.company && (
                                <div>
                                  <label className="text-sm font-medium">Company</label>
                                  <p className="text-sm text-muted-foreground">{selectedInquiry.company}</p>
                                </div>
                              )}
                            </div>

                            {selectedInquiry.service_interest && (
                              <div>
                                <label className="text-sm font-medium">Service Interest</label>
                                <p className="text-sm text-muted-foreground">
                                  {selectedInquiry.service_interest.replace('_', ' ')}
                                </p>
                              </div>
                            )}

                            {selectedInquiry.preferred_contact_time && (
                              <div>
                                <label className="text-sm font-medium">Preferred Contact Time</label>
                                <p className="text-sm text-muted-foreground">{selectedInquiry.preferred_contact_time}</p>
                              </div>
                            )}

                            <div>
                              <label className="text-sm font-medium">Message</label>
                              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedInquiry.message}</p>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                              <div>
                                <label className="text-sm font-medium">Created</label>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(selectedInquiry.created_at).toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Status</label>
                                <Badge className={`text-xs ${getStatusColor(selectedInquiry.status)}`}>
                                  {selectedInquiry.status.replace('_', ' ')}
                                </Badge>
                              </div>
                            </div>

                            {selectedInquiry.admin_notes && (
                              <div>
                                <label className="text-sm font-medium">Admin Notes</label>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                  {selectedInquiry.admin_notes}
                                </p>
                              </div>
                            )}
                          </TabsContent>

                          <TabsContent value="manage" className="space-y-4">
                            <div>
                              <label className="text-sm font-medium mb-2 block">Update Status</label>
                              <Select
                                value={selectedInquiry.status}
                                onValueChange={(value) => setSelectedInquiry({...selectedInquiry, status: value as any})}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="new">New</SelectItem>
                                  <SelectItem value="in_progress">In Progress</SelectItem>
                                  <SelectItem value="responded">Responded</SelectItem>
                                  <SelectItem value="closed">Closed</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <label className="text-sm font-medium mb-2 block">Admin Notes</label>
                              <Textarea
                                placeholder="Add notes about this inquiry..."
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                                rows={4}
                              />
                            </div>

                            <div className="flex space-x-2">
                              <Button 
                                onClick={() => updateInquiryStatus(selectedInquiry.id, selectedInquiry.status)}
                                className="flex-1"
                              >
                                Update Inquiry
                              </Button>
                              <Button 
                                variant="outline"
                                onClick={() => window.open(`mailto:${selectedInquiry.email}?subject=Re: Your Inquiry&body=Hi ${selectedInquiry.name},%0D%0A%0D%0AThank you for your inquiry about ${selectedInquiry.service_interest?.replace('_', ' ')}...`)}
                              >
                                <Mail className="h-4 w-4 mr-2" />
                                Email
                              </Button>
                            </div>
                          </TabsContent>
                        </Tabs>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}