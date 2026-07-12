const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://razanxfefihxrbdqdlcm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhemFueGZlZmloeHJiZHFkbGNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5MjAzMzUsImV4cCI6MjA5ODQ5NjMzNX0.ftc2aRxfok80Y4QUi30CCXThmzuQoXGZWj3oT28kFQw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testFetch() {
  const { data, error } = await supabase
    .from('event_config')
    .select('value')
    .eq('key', 'hologram_config')
    .single();

  console.log('Result for hologram_config:', { data, error });

  const { data: list, error: listErr } = await supabase
    .from('event_config')
    .select('*');

  console.log('List of configs:', { list, listErr });
}

testFetch();
