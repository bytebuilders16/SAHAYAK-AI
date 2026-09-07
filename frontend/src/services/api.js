const API_BASE =
  import.meta.env.VITE_API_URL ||
  'https://sahayak-ai-1-bqx5.onrender.com';

export async function getSchemes(category = '', search = '') {
  try {
    const params = new URLSearchParams();

    if (category && category !== 'All') {
      params.append('category', category);
    }

    if (search) {
      params.append('search', search);
    }

    const res = await fetch(
      `${API_BASE}/api/schemes?${params.toString()}`
    );

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);

    const data = await res.json();
    return data.schemes || [];
  } catch (err) {
    console.warn('API getSchemes error:', err);
    return [];
  }
}

export async function getSchemeById(id) {
  try {
    const res = await fetch(`${API_BASE}/api/schemes/${id}`);

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);

    const data = await res.json();
    return data.scheme;
  } catch (err) {
    console.warn(`API getSchemeById error for ${id}:`, err);
    return null;
  }
}

export async function checkEligibility(profile) {
  try {
    const res = await fetch(`${API_BASE}/api/check-eligibility`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profile)
    });

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);

    return await res.json();
  } catch (err) {
    console.error('API checkEligibility error:', err);
    throw err;
  }
}

export async function sendChatMessage(message, userProfile = null) {
  try {
    const res = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        user_profile: userProfile
      })
    });

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);

    return await res.json();
  } catch (err) {
    console.error('API sendChatMessage error:', err);
    throw err;
  }
}

export async function getApplicationGuide(
  schemeId,
  userProfile = null
) {
  try {
    const res = await fetch(`${API_BASE}/api/application-guide`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        scheme_id: schemeId,
        user_profile: userProfile
      })
    });

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);

    return await res.json();
  } catch (err) {
    console.error('API getApplicationGuide error:', err);
    throw err;
  }
}