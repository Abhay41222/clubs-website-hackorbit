import useSWR from 'swr';
import { supabase } from '../services/supabase';

// SWR fetcher function using Supabase
const fetcher = async (table: string, query = {}) => {
  const { select, ...filters } = query as any;
  
  let request = supabase.from(table).select(select || '*');
  
  // Apply filters if any
  Object.entries(filters).forEach(([key, value]) => {
    if (key === 'order') {
      const [column, direction] = (value as string).split(':');
      request = request.order(column, { ascending: direction !== 'desc' });
    } else if (key === 'limit') {
      request = request.limit(Number(value));
    } else if (key === 'eq') {
      const [column, val] = (value as string).split(':');
      request = request.eq(column, val);
    } else if (key === 'gt') {
      const [column, val] = (value as string).split(':');
      request = request.gt(column, val);
    } else if (key === 'gte') {
      const [column, val] = (value as string).split(':');
      request = request.gte(column, val);
    } else if (key === 'lt') {
      const [column, val] = (value as string).split(':');
      request = request.lt(column, val);
    } else if (key === 'lte') {
      const [column, val] = (value as string).split(':');
      request = request.lte(column, val);
    }
  });
  
  const { data, error } = await request;
  
  if (error) throw new Error(error.message);
  return data;
};

// A generic hook for any table
export function useSupabaseQuery(table: string, query = {}, options = {}) {
  const { data, error, isLoading, mutate } = useSWR(
    [table, query], 
    () => fetcher(table, query),
    options
  );

  return {
    data,
    isLoading,
    isError: !!error,
    error,
    mutate
  };
}

// Specialized hooks for our specific data needs
export function useClubs() {
  return useSupabaseQuery('clubs', { 
    order: 'name:asc',
    select: 'id,name,description,logo_url,followers_count,is_verified'
  });
}

export function useClub(clubId: string | undefined) {
  // Use a custom fetcher for club details to include related data
  const { data, error, isLoading, mutate } = useSWR(
    clubId ? ['club-details', clubId] : null,
    async () => {
      if (!clubId) return null;
      
      // Get club details
      const { data: club, error: clubError } = await supabase
        .from('clubs')
        .select('id, name, description, logo_url, followers_count, is_verified')
        .eq('id', clubId)
        .single();
      
      if (clubError) throw new Error(clubError.message);
      
      // Get core members
      const { data: coreMembers, error: membersError } = await supabase
        .from('core_members')
        .select(`
          id, role, joined_at, is_active,
          users:user_id (id, name, email, branch, year)
        `)
        .eq('club_id', clubId)
        .eq('is_active', true);
      
      if (membersError) throw new Error(membersError.message);
      
      // Get upcoming events
      const { data: upcomingEvents, error: eventsError } = await supabase
        .from('events')
        .select('id, title, description, date, time, location, event_type')
        .eq('club_id', clubId)
        .gte('date', new Date().toISOString().split('T')[0])
        .order('date', { ascending: true })
        .limit(3);
      
      if (eventsError) throw new Error(eventsError.message);
      
      // Get followers for this user (to check follow status)
      const { data: followers } = await supabase
        .from('club_followers')
        .select('user_id, joined_at')
        .eq('club_id', clubId);
      
      return {
        ...club,
        coreMembers,
        upcomingEvents,
        followers
      };
    }
  );
  
  return {
    data,
    isLoading,
    isError: !!error,
    error,
    mutate
  };
}

export function useEvents(limit?: number) {
  const query: any = {
    select: `
      id,
      title,
      description,
      date,
      time,
      location,
      event_type,
      banner_url,
      is_live,
      club_id
    `,
    order: 'date:asc',
    gte: `date:${new Date().toISOString().split('T')[0]}`
  };

  if (limit) {
    query.limit = limit;
  }

  // Cast the response to our Event type
  const response = useSupabaseQuery('events', query);
  return {
    ...response,
    data: response.data as any // Fix type mismatch
  };
}

export function useEvent(eventId: string | undefined) {
  // Use custom fetcher for event details with related data
  const { data, error, isLoading, mutate } = useSWR(
    eventId ? ['event-details', eventId] : null,
    async () => {
      if (!eventId) return null;
      
      // Get event details with club information
      const { data: event, error: eventError } = await supabase
        .from('events')
        .select(`
          id,
          title,
          description,
          date,
          time,
          location,
          event_type,
          banner_url,
          is_live,
          created_at,
          club_id,
          created_by
        `)
        .eq('id', eventId)
        .single();
      
      if (eventError) throw new Error(eventError.message);
      
      // Get club details
      const { data: club } = await supabase
        .from('clubs')
        .select('id, name, description, logo_url')
        .eq('id', event.club_id)
        .single();
      
      // Count RSVPs for this event
      const { count, error: countError } = await supabase
        .from('event_rsvps')
        .select('user_id', { count: 'exact', head: true })
        .eq('event_id', eventId);
      
      if (countError) throw new Error(countError.message);
      
      // Get RSVPs for this event (to check user RSVP status)
      const { data: rsvps } = await supabase
        .from('event_rsvps')
        .select('user_id, timestamp')
        .eq('event_id', eventId);
      
      return {
        ...event,
        clubs: club, // Single club object, not an array
        rsvpCount: count,
        rsvps
      };
    }
  );
  
  // Cast to our EventDetails type
  return {
    data: data as any, // Fix type mismatch
    isLoading,
    isError: !!error,
    error,
    mutate
  };
}

// Hook to check if user follows a club
export function useUserClubStatus(userId: string | undefined, clubId: string | undefined) {
  return useSupabaseQuery('club_followers', {
    eq: `user_id:${userId},club_id:${clubId}`,
    select: 'status,joined_at'
  }, {
    disabled: !userId || !clubId
  });
}

// Hook to check if user RSVPed to an event
export function useUserEventStatus(userId: string | undefined, eventId: string | undefined) {
  return useSupabaseQuery('event_rsvps', {
    eq: `user_id:${userId},event_id:${eventId}`,
    select: 'status,timestamp'
  }, {
    disabled: !userId || !eventId
  });
}
