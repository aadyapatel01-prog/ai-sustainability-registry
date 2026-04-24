'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <div style={{background:'#0A0F1E',minHeight:'100vh',fontFamily:'system-ui,sans-serif',color:'#E2E8F0'}}>

      {/* Nav */}
      <div style={{background:'#0D1424',borderBottom:'1px solid #1E2A3E',padding:'0 28px',height:'56px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:'20px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
            <div style={{width:'28px',height:'28px',background:'#1D9E75',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:'700',color:'#fff'}}>AI</div>
            <span style={{fontSize:'14px',fontWeight:'600',color:'#F1F5F9'}}>Sustainability Registry</span>
          </div>
          <div style={{display:'flex',gap:'4px'}}>
            {['Home','Registry','About','Submit a tool'].map(l => (
              <div key={l} onClick={()=>l==='Registry'&&router.push('/registry')} style={{fontSize:'13px',padding:'5px 12px',borderRadius:'6px',color:l==='Home'?'#E2E8F0':'#94A3B8',background:l==='Home'?'#1E2A3E':'transparent',cursor:'pointer'}}>{l}</div>
            ))}
          </div>
        </div>
        <div style={{display:'flex',gap:'10px'}}>
          <button onClick={()=>router.push('/registry')} style={{fontSize:'12px',padding:'6px 14px',borderRadius:'8px',background:'transparent',color:'#94A3B8',border:'1px solid #1E2A3E',cursor:'pointer'}}>View registry</button>
          <button style={{fontSize:'12px',padding:'6px 14px',borderRadius:'8px',background:'#1D9E75',color:'#fff',border:'none',cursor:'pointer',fontWeight:'500'}}>+ Submit tool</button>
        </div>
      </div>

      {/* Hero */}
      <div style={{padding:'72px 28px 64px',borderBottom:'1px solid #1E2A3E',textAlign:'center',display:'flex',flexDirection:'column',alignItems:'center'}}>
        <div style={{display:'flex',alignItems:'center',gap:'8px',background:'#0A2420',border:'1px solid #0F3A2E',borderRadius:'20px',padding:'5px 14px',marginBottom:'28px'}}>
          <div style={{width:'7px',height:'7px',borderRadius:'50%',background:'#1D9E75'}}></div>
          <span style={{fontSize:'12px',color:'#5DCAA5',fontWeight:'500'}}>EMC Research · Live registry · 2025</span>
        </div>
        <h1 style={{fontSize:'38px',fontWeight:'700',color:'#F1F5F9',lineHeight:'1.25',marginBottom:'16px',maxWidth:'560px'}}>
          The definitive guide to <span style={{color:'#1D9E75'}}>AI in sustainability</span>
        </h1>
        <p style={{fontSize:'15px',color:'#64748B',lineHeight:'1.75',maxWidth:'480px',marginBottom:'36px'}}>
          Discover, compare and stay current on AI tools, models and workflows transforming ESG reporting, carbon accounting and sustainability research.
        </p>
        <div style={{display:'flex',gap:'12px',marginBottom:'56px'}}>
          <button onClick={()=>router.push('/registry')} style={{fontSize:'13px',padding:'10px 24px',borderRadius:'9px',background:'#1D9E75',color:'#fff',border:'none',cursor:'pointer',fontWeight:'600'}}>Explore the registry →</button>
          <button style={{fontSize:'13px',padding:'10px 24px',borderRadius:'9px',background:'transparent',color:'#94A3B8',border:'1px solid #1E2A3E',cursor:'pointer'}}>Submit a tool</button>
        </div>
        <div style={{display:'flex',border:'1px solid #1E2A3E',borderRadius:'12px',overflow:'hidden',background:'#0D1424'}}>
          {[{n:'37',l:'Tools indexed'},{n:'3',l:'Categories'},{n:'8',l:'AI types'},{n:'6',l:'Regions'}].map((s,i)=>(
            <div key={s.l} style={{padding:'18px 28px',textAlign:'center',borderRight:i<3?'1px solid #1E2A3E':'none'}}>
              <div style={{fontSize:'26px',fontWeight:'700',color:'#1D9E75'}}>{s.n}</div>
              <div style={{fontSize:'11px',color:'#475569',marginTop:'3px'}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div style={{padding:'52px 28px',borderBottom:'1px solid #1E2A3E'}}>
        <div style={{fontSize:'11px',fontWeight:'600',color:'#1D9E75',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'10px'}}>What's inside</div>
        <h2 style={{fontSize:'22px',fontWeight:'700',color:'#F1F5F9',marginBottom:'8px'}}>Three categories of AI application</h2>
        <p style={{fontSize:'14px',color:'#64748B',lineHeight:'1.7',maxWidth:'480px',marginBottom:'32px'}}>The registry covers AI across the full sustainability stack — from general-purpose workflow tools to specialised ESG products and cutting-edge research models.</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'14px'}}>
          {[
            {title:'AI & Automation in Workflows',desc:'General-purpose AI models like ChatGPT, Claude and Gemini used to streamline ESG reporting, research and document workflows.',count:'10',color:'#AFA9EC',bg:'#1E1A3E'},
            {title:'AI in ESG Products',desc:'AI assistants embedded in enterprise sustainability platforms like Persefoni, Sphera and EcoVadis for domain-specific ESG tasks.',count:'17',color:'#5DCAA5',bg:'#0A2420'},
            {title:'AI Models in Research',desc:'Specific models and algorithms applied in academic and applied research — ClimateBERT, RAG systems, satellite CV models and more.',count:'10',color:'#EF9F27',bg:'#2A1E06'},
          ].map(c=>(
            <div key={c.title} onClick={()=>router.push('/registry')} style={{background:'#0D1424',border:'1px solid #1E2A3E',borderRadius:'12px',padding:'20px',cursor:'pointer'}}>
              <div style={{width:'36px',height:'36px',borderRadius:'9px',background:c.bg,marginBottom:'14px'}}></div>
              <div style={{fontSize:'14px',fontWeight:'600',color:'#F1F5F9',marginBottom:'6px'}}>{c.title}</div>
              <div style={{fontSize:'12px',color:'#475569',lineHeight:'1.6',marginBottom:'14px'}}>{c.desc}</div>
              <div style={{fontSize:'11px',color:'#1D9E75',fontWeight:'500'}}>{c.count} tools →</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{padding:'52px 28px',borderBottom:'1px solid #1E2A3E'}}>
        <div style={{fontSize:'11px',fontWeight:'600',color:'#1D9E75',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'10px'}}>How it works</div>
        <h2 style={{fontSize:'22px',fontWeight:'700',color:'#F1F5F9',marginBottom:'8px'}}>Built to be useful, not just informative</h2>
        <p style={{fontSize:'14px',color:'#64748B',lineHeight:'1.7',maxWidth:'480px',marginBottom:'32px'}}>Designed for ESG practitioners, researchers and teams who need to make informed decisions about AI adoption.</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'14px'}}>
          {[
            {n:'01',title:'Search & filter',desc:'Find tools by name, AI type, use case, region or tags. Filter by category to narrow down instantly.'},
            {n:'02',title:'Compare tools',desc:'Each entry includes benefits, limitations, target users and a curated insight so you can evaluate quickly.'},
            {n:'03',title:'Submit & grow',desc:'Know a tool we have missed? Submit it for review. The registry grows through community contributions.'},
          ].map(h=>(
            <div key={h.n} style={{background:'#0D1424',border:'1px solid #1E2A3E',borderRadius:'12px',padding:'20px'}}>
              <div style={{fontSize:'28px',fontWeight:'700',color:'#1E2A3E',marginBottom:'10px'}}>{h.n}</div>
              <div style={{fontSize:'14px',fontWeight:'600',color:'#F1F5F9',marginBottom:'6px'}}>{h.title}</div>
              <div style={{fontSize:'12px',color:'#475569',lineHeight:'1.6'}}>{h.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{padding:'52px 28px',textAlign:'center',display:'flex',flexDirection:'column',alignItems:'center'}}>
        <h2 style={{fontSize:'22px',fontWeight:'700',color:'#F1F5F9',marginBottom:'10px'}}>Ready to explore?</h2>
        <p style={{fontSize:'14px',color:'#64748B',marginBottom:'28px',maxWidth:'400px',lineHeight:'1.7'}}>Browse all 37 AI tools across sustainability workflows, ESG products and research models.</p>
        <div style={{display:'flex',gap:'12px'}}>
          <button onClick={()=>router.push('/registry')} style={{fontSize:'13px',padding:'10px 24px',borderRadius:'9px',background:'#1D9E75',color:'#fff',border:'none',cursor:'pointer',fontWeight:'600'}}>Open the registry →</button>
          <button style={{fontSize:'13px',padding:'10px 24px',borderRadius:'9px',background:'transparent',color:'#94A3B8',border:'1px solid #1E2A3E',cursor:'pointer'}}>Submit a tool</button>
        </div>
      </div>

      {/* Footer */}
      <div style={{background:'#0D1424',borderTop:'1px solid #1E2A3E',padding:'20px 28px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontSize:'12px',color:'#475569'}}>AI Sustainability Registry · EMC Research · 2025</div>
        <div style={{display:'flex',gap:'16px'}}>
          {['About','Submit a tool','GitHub'].map(l=>(
            <span key={l} style={{fontSize:'12px',color:'#475569',cursor:'pointer'}}>{l}</span>
          ))}
        </div>
      </div>

    </div>
  )
}
