// ==========================================================
// CONTENT CONTROLLER
// Handles content management operations (CRUD operations for page content)
// Content is stored in JSON files for easy editing and backup
// ==========================================================

const fs = require('fs').promises;
const path = require('path');

// Content storage file
const CONTENT_FILE = path.join(__dirname, '../data/content.json');

// Default content from the original data files
const DEFAULT_CONTENT = {
  // Home page content
  "home:hero:tagline": {
    value: "Serving Humanity with Compassion, Dignity & Hope",
    type: "text",
    updatedAt: new Date().toISOString()
  },
  "home:hero:intro": {
    value: "The ARV Foundation is a non-governmental organization established on 14 November 2017, dedicated to uplifting underprivileged communities through education, healthcare, food, shelter, and environmental initiatives.",
    type: "textarea",
    updatedAt: new Date().toISOString()
  },
  "home:about:who": {
    value: "ARV Foundation works at the grassroots level to reduce poverty, inequality, and social neglect by empowering individuals and communities.",
    type: "textarea",
    updatedAt: new Date().toISOString()
  },
  "home:about:mission": {
    value: "To empower underprivileged communities through education, healthcare, awareness, and sustainable development.",
    type: "textarea",
    updatedAt: new Date().toISOString()
  },
  "home:about:vision": {
    value: "A just, equal, and compassionate society for all.",
    type: "textarea",
    updatedAt: new Date().toISOString()
  },

  // Work page content
  "work:orphanage-support:title": {
    value: "Orphanage Support",
    type: "text",
    updatedAt: new Date().toISOString()
  },
  "work:orphanage-support:description": {
    value: "ARV Foundation has been doing incredible work in supporting orphanages around the world. At the heart of their mission is a deep commitment to providing vulnerable children with the care, resources, and opportunities they need to thrive.",
    type: "textarea",
    updatedAt: new Date().toISOString()
  },
  "work:orphanage-support:content": {
    value: "At ARV Foundation, we believe every child deserves love, care, and a chance at a bright future. Our Orphanage Support program works closely with orphanages across Prayagraj and surrounding regions to improve the living conditions of children who have lost their families.\n\nWe provide nutritious meals, educational supplies, hygiene kits, and emotional support through mentorship programs. Regular health check-ups are organized in collaboration with local healthcare providers to ensure the well-being of every child.\n\nOur volunteers visit orphanages on weekends to teach, play, and spend quality time with the children — because sometimes a warm smile can change a life.",
    type: "richtext",
    updatedAt: new Date().toISOString()
  },

  "work:old-age-home:title": {
    value: "Old Age Home",
    type: "text",
    updatedAt: new Date().toISOString()
  },
  "work:old-age-home:description": {
    value: "ARV Foundation has been doing invaluable work in supporting old age homes and the elderly individuals who reside in them. Many of these seniors unfortunately find themselves in these facilities after being abandoned or neglected by their own children.",
    type: "textarea",
    updatedAt: new Date().toISOString()
  },
  "work:old-age-home:content": {
    value: "Senior citizens who have been abandoned by their families deserve dignity, companionship, and care. ARV Foundation supports old-age homes by providing essential supplies, medical aid, and recreational activities.\n\nWe organize regular visits where volunteers interact with the elderly, celebrate festivals together, and provide physiotherapy and health awareness sessions.\n\nOur goal is to make sure no senior citizen feels forgotten or alone.",
    type: "richtext",
    updatedAt: new Date().toISOString()
  },

  "work:slum-area-development:title": {
    value: "Slum Area Development",
    type: "text",
    updatedAt: new Date().toISOString()
  },
  "work:slum-area-development:description": {
    value: "The ARV foundation has been doing crucial work in the slum areas, tirelessly dedicating their efforts to addressing the basic needs and raising awareness among the impoverished communities living in these challenging conditions.",
    type: "textarea",
    updatedAt: new Date().toISOString()
  },
  "work:slum-area-development:content": {
    value: "Millions of families in urban slums live without basic sanitation, clean water, and education. ARV Foundation runs community development programs in slum areas of Prayagraj.\n\nWe conduct health camps, distribute food and essential supplies, organize education-awareness drives, and set up temporary learning centers for children who cannot attend regular schools.\n\nBy partnering with local leaders and volunteers, we aim to create sustainable improvements that uplift entire communities.",
    type: "richtext",
    updatedAt: new Date().toISOString()
  },

  "work:environment-protection:title": {
    value: "Environment Protection",
    type: "text",
    updatedAt: new Date().toISOString()
  },
  "work:environment-protection:description": {
    value: "The ARV Foundation has taken on the vital mission of addressing two pressing global issues: environmental conservation and the scourge of plastic pollution. Through their multifaceted initiatives, the foundation is spearheading a concerted effort to safeguard the natural world and build a more sustainable, plastic-free future.",
    type: "textarea",
    updatedAt: new Date().toISOString()
  },
  "work:environment-protection:content": {
    value: "Protecting our planet is integral to every mission. ARV Foundation spearheads tree-plantation drives, plastic-free campaigns, and cleanliness initiatives across Prayagraj.\n\nOur flagship 'Go For Sangam' campaign focuses on maintaining the purity and cleanliness of the sacred Sangam area. Volunteers participate in weekly clean-up drives along the riverbanks.\n\nWe also conduct environmental awareness workshops in schools and colleges, motivating the youth to adopt eco-friendly practices.",
    type: "richtext",
    updatedAt: new Date().toISOString()
  },

  "work:education:title": {
    value: "Education",
    type: "text",
    updatedAt: new Date().toISOString()
  },
  "work:education:description": {
    value: "The ARV Foundation is dedicated to providing free education and creating awareness about the importance of education for children around the world. Through their impactful initiatives, the foundation works tirelessly to ensure that no child is left behind.",
    type: "textarea",
    updatedAt: new Date().toISOString()
  },
  "work:education:content": {
    value: "Education is the most powerful tool for social transformation. ARV Foundation provides free tuition and learning resources to children from underprivileged backgrounds.\n\nWe run after-school support centers, distribute notebooks, uniforms, and stationery, and organize scholarship drives to help bright students continue their education.\n\nOur tutors and volunteers dedicate their evenings and weekends to ensure that no child is left behind because of poverty.",
    type: "richtext",
    updatedAt: new Date().toISOString()
  },

  "work:health:title": {
    value: "Health",
    type: "text",
    updatedAt: new Date().toISOString()
  },
  "work:health:description": {
    value: "ARV Foundation has been a driving force in the health sector, working tirelessly to improve the lives of individuals and communities around the world. At the core of their mission is a deep commitment to expanding access to essential medical care and resources.",
    type: "textarea",
    updatedAt: new Date().toISOString()
  },
  "work:health:content": {
    value: "Access to healthcare should be a right, not a privilege. ARV Foundation organizes free medical camps in slum areas, villages, and old-age homes.\n\nWe distribute essential medicines, provide basic health screenings, and run awareness campaigns on topics like hygiene, nutrition, and preventive care.\n\nIn collaboration with local hospitals and doctors, we ensure that medical support reaches those who need it the most.",
    type: "richtext",
    updatedAt: new Date().toISOString()
  },

  "work:old-clothes-distribution:title": {
    value: "Old Clothes Distribution",
    type: "text",
    updatedAt: new Date().toISOString()
  },
  "work:old-clothes-distribution:description": {
    value: "ARV Foundation, a charitable organization dedicated to serving underprivileged communities, has extended its reach beyond just providing essential food and medical aid - they have also taken on the important initiative of distributing old, gently-used clothing to residents of nearby slum areas.",
    type: "textarea",
    updatedAt: new Date().toISOString()
  },
  "work:old-clothes-distribution:content": {
    value: "Clothing is a basic need that many families cannot afford. ARV Foundation regularly collects clean, usable clothes from donors and distributes them across slum communities and homeless shelters.\n\nOur winter-wear drives ensure warmth for children and the elderly during harsh cold months. Every piece of clothing collected reaches a family in need.\n\nYou can contribute by donating your used clothes at our collection points or during organized drives.",
    type: "richtext",
    updatedAt: new Date().toISOString()
  },

  "work:food-drive:title": {
    value: "Food Drive",
    type: "text",
    updatedAt: new Date().toISOString()
  },
  "work:food-drive:description": {
    value: "ARV Foundation has been diligently working to address the critical issue of food insecurity within the slum areas and among the labor class population. Recognizing the stark disparities in access to basic sustenance, the Foundation has spearheaded a comprehensive food drive initiative.",
    type: "textarea",
    updatedAt: new Date().toISOString()
  },
  "work:food-drive:content": {
    value: "Hunger cannot wait. ARV Foundation conducts regular food drives to provide nutritious meals to families in slum areas, daily-wage workers, and the homeless.\n\nDuring festivals and special occasions, we organize large-scale community kitchens that serve hundreds of people. Our volunteers prepare and distribute packets of cooked food, dry rations, and clean drinking water.\n\nEvery meal we serve is a step toward zero hunger in our community.",
    type: "richtext",
    updatedAt: new Date().toISOString()
  },

  // About page content
  "about:main:who": {
    value: "ARV Foundation works at the grassroots level to reduce poverty, inequality, and social neglect by empowering individuals and communities.",
    type: "textarea",
    updatedAt: new Date().toISOString()
  },
  "about:main:mission": {
    value: "To empower underprivileged communities through education, healthcare, awareness, and sustainable development.",
    type: "textarea",
    updatedAt: new Date().toISOString()
  },
  "about:main:vision": {
    value: "A just, equal, and compassionate society for all.",
    type: "textarea",
    updatedAt: new Date().toISOString()
  },

  // Initiative pages content
  "initiative:sanitary-pad-initiative:title": {
    value: "Sanitary Pad Initiative",
    type: "text",
    updatedAt: new Date().toISOString()
  },
  "initiative:sanitary-pad-initiative:description": {
    value: "Raising menstrual health awareness and distributing free sanitary pads to women and girls.",
    type: "textarea",
    updatedAt: new Date().toISOString()
  },
  "initiative:sanitary-pad-initiative:content": {
    value: "Menstrual health is a critical aspect of women's well-being that is often overlooked. ARV Foundation's Sanitary Pad Initiative addresses this important need by raising awareness and distributing free sanitary pads to women and girls in underprivileged communities.\n\nOur initiative includes educational workshops on menstrual hygiene, distribution of eco-friendly sanitary products, and breaking taboos surrounding menstruation in rural and slum areas.",
    type: "richtext",
    updatedAt: new Date().toISOString()
  },

  "initiative:go-for-sangam:title": {
    value: "Go For Sangam",
    type: "text",
    updatedAt: new Date().toISOString()
  },
  "initiative:go-for-sangam:description": {
    value: "A cleanliness initiative to restore the purity of River Sangam, Prayagraj.",
    type: "textarea",
    updatedAt: new Date().toISOString()
  },
  "initiative:go-for-sangam:content": {
    value: "The sacred River Sangam in Prayagraj holds immense spiritual significance for millions. However, pollution and neglect have threatened its purity. ARV Foundation's 'Go For Sangam' initiative is dedicated to restoring and maintaining the cleanliness of this holy confluence.\n\nOur volunteers conduct regular clean-up drives, raise awareness about river conservation, and work with local authorities to implement sustainable waste management practices.",
    type: "richtext",
    updatedAt: new Date().toISOString()
  },

  "initiative:blood-donation-drive:title": {
    value: "Blood Donation Drive",
    type: "text",
    updatedAt: new Date().toISOString()
  },
  "initiative:blood-donation-drive:description": {
    value: "Encouraging voluntary blood donation in collaboration with Police Mitra.",
    type: "textarea",
    updatedAt: new Date().toISOString()
  },
  "initiative:blood-donation-drive:content": {
    value: "Blood donation saves lives, yet many patients struggle to find compatible blood donors during emergencies. ARV Foundation, in collaboration with Police Mitra, organizes regular blood donation drives to build a sustainable blood supply.\n\nOur camps include medical screening, donor registration, and follow-up care. We also educate communities about the importance of voluntary blood donation and organize awareness campaigns in schools and colleges.",
    type: "richtext",
    updatedAt: new Date().toISOString()
  },

  "initiative:tree-plantation-drive:title": {
    value: "Tree Plantation Drive",
    type: "text",
    updatedAt: new Date().toISOString()
  },
  "initiative:tree-plantation-drive:description": {
    value: "Planting saplings to increase green cover and combat climate change.",
    type: "textarea",
    updatedAt: new Date().toISOString()
  },
  "initiative:tree-plantation-drive:content": {
    value: "Climate change and deforestation pose serious threats to our environment. ARV Foundation's Tree Plantation Drive aims to increase green cover, improve air quality, and create sustainable ecosystems.\n\nWe organize mass plantation events, maintain nurseries for saplings, and conduct environmental education programs. Our goal is to plant thousands of trees annually and create a greener, healthier future for Prayagraj.",
    type: "richtext",
    updatedAt: new Date().toISOString()
  },

  "initiative:winter-blanket-distribution:title": {
    value: "Winter Blanket Distribution",
    type: "text",
    updatedAt: new Date().toISOString()
  },
  "initiative:winter-blanket-distribution:description": {
    value: "Providing warm blankets to the homeless during harsh winters.",
    type: "textarea",
    updatedAt: new Date().toISOString()
  },
  "initiative:winter-blanket-distribution:content": {
    value: "Winters in Prayagraj can be extremely harsh, especially for the homeless and those living in inadequate shelter. ARV Foundation's Winter Blanket Distribution initiative ensures that vulnerable populations stay warm during the cold months.\n\nWe collect donations of warm blankets and clothing, conduct surveys to identify those most in need, and distribute items directly to homeless shelters, slum communities, and elderly care homes.",
    type: "richtext",
    updatedAt: new Date().toISOString()
  },

  // Partner pages content
  "partner:shuruat-ek-jyoti-shiksha-ki:title": {
    value: "Shuruat Ek Jyoti Shiksha Ki",
    type: "text",
    updatedAt: new Date().toISOString()
  },
  "partner:shuruat-ek-jyoti-shiksha-ki:description": {
    value: "Educational partnership focused on lighting the path of knowledge for underprivileged children.",
    type: "textarea",
    updatedAt: new Date().toISOString()
  },
  "partner:shuruat-ek-jyoti-shiksha-ki:content": {
    value: "Shuruat Ek Jyoti Shiksha Ki is our esteemed educational partner dedicated to providing quality education to children from economically disadvantaged backgrounds. Together, we run learning centers, provide scholarships, and develop innovative teaching methods.\n\nOur collaboration focuses on holistic child development, combining academic excellence with life skills training and moral education.",
    type: "richtext",
    updatedAt: new Date().toISOString()
  },

  "partner:adharshila-vridhaashram:title": {
    value: "Adharshila Vridhaashram",
    type: "text",
    updatedAt: new Date().toISOString()
  },
  "partner:adharshila-vridhaashram:description": {
    value: "Senior care facility providing dignity and care to elderly citizens.",
    type: "textarea",
    updatedAt: new Date().toISOString()
  },
  "partner:adharshila-vridhaashram:content": {
    value: "Adharshila Vridhaashram is a dedicated senior care facility that provides comprehensive care, medical attention, and emotional support to elderly citizens who have been abandoned or neglected. Our partnership ensures regular visits, medical camps, and recreational activities for the residents.\n\nTogether, we work to restore dignity and provide companionship to seniors who deserve respect and care in their golden years.",
    type: "richtext",
    updatedAt: new Date().toISOString()
  },

  "partner:the-earth-modifications-team:title": {
    value: "The Earth Modifications Team",
    type: "text",
    updatedAt: new Date().toISOString()
  },
  "partner:the-earth-modifications-team:description": {
    value: "Environmental organization focused on sustainable development and ecological restoration.",
    type: "textarea",
    updatedAt: new Date().toISOString()
  },
  "partner:the-earth-modifications-team:content": {
    value: "The Earth Modifications Team is our environmental partner working towards sustainable development and ecological restoration. Together, we implement innovative solutions for waste management, water conservation, and green energy initiatives.\n\nOur joint projects include urban gardening, plastic-free campaigns, and environmental education programs that empower communities to protect their natural surroundings.",
    type: "richtext",
    updatedAt: new Date().toISOString()
  },

  "partner:kedarsut-foundation:title": {
    value: "Kedarsut Foundation",
    type: "text",
    updatedAt: new Date().toISOString()
  },
  "partner:kedarsut-foundation:description": {
    value: "Healthcare and wellness organization providing medical services to rural communities.",
    type: "textarea",
    updatedAt: new Date().toISOString()
  },
  "partner:kedarsut-foundation:content": {
    value: "Kedarsut Foundation is our healthcare partner dedicated to providing quality medical services to rural and underserved communities. Our collaboration includes mobile medical camps, vaccination drives, and health awareness programs.\n\nTogether, we ensure that quality healthcare reaches those who need it most, regardless of their economic status or geographical location.",
    type: "richtext",
    updatedAt: new Date().toISOString()
  },

  "partner:miopass-charitable-and-welfare-foundation:title": {
    value: "Miopass Charitable and Welfare Foundation",
    type: "text",
    updatedAt: new Date().toISOString()
  },
  "partner:miopass-charitable-and-welfare-foundation:description": {
    value: "Multi-sector charitable organization supporting education, healthcare, and community development.",
    type: "textarea",
    updatedAt: new Date().toISOString()
  },
  "partner:miopass-charitable-and-welfare-foundation:content": {
    value: "Miopass Charitable and Welfare Foundation is a comprehensive charitable organization that supports our mission across multiple sectors. Our partnership encompasses joint initiatives in education, healthcare, community development, and emergency relief.\n\nTogether, we create sustainable impact by combining resources, expertise, and community networks to address complex social challenges.",
    type: "richtext",
    updatedAt: new Date().toISOString()
  },
};

// Initialize content file if it doesn't exist
const initializeContentFile = async () => {
  try {
    await fs.access(CONTENT_FILE);
  } catch (error) {
    // File doesn't exist, create it with default content
    await fs.writeFile(CONTENT_FILE, JSON.stringify(DEFAULT_CONTENT, null, 2));
    console.log('Content file initialized with default data');
  }
};

// Read content from file
const readContentFile = async () => {
  try {
    await initializeContentFile();
    const data = await fs.readFile(CONTENT_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading content file:', error);
    return DEFAULT_CONTENT;
  }
};

// Write content to file
const writeContentFile = async (content) => {
  try {
    await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2));
  } catch (error) {
    console.error('Error writing content file:', error);
    throw new Error('Failed to save content');
  }
};

// ========== CONTROLLER FUNCTIONS ==========

// GET /api/admin/content
const getAllContent = async (req, res) => {
  try {
    const content = await readContentFile();
    res.json({
      success: true,
      content: content,
      message: 'Content retrieved successfully'
    });
  } catch (error) {
    console.error('Error getting all content:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve content',
      error: error.message
    });
  }
};

// PUT /api/admin/content/:key
const updateContent = async (req, res) => {
  try {
    const { key } = req.params;
    const { value, type = 'text' } = req.body;

    if (!key || value === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Content key and value are required'
      });
    }

    const content = await readContentFile();
    
    // Update the content
    content[key] = {
      value: value,
      type: type,
      updatedAt: new Date().toISOString()
    };

    await writeContentFile(content);

    res.json({
      success: true,
      message: 'Content updated successfully',
      data: { key, value, type }
    });
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update content',
      error: error.message
    });
  }
};

// PUT /api/admin/content/batch
const batchUpdateContent = async (req, res) => {
  try {
    const { updates } = req.body;

    if (!Array.isArray(updates) || updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Updates array is required'
      });
    }

    const content = await readContentFile();
    let updatedCount = 0;

    // Process each update
    for (const update of updates) {
      if (update.contentKey && update.value !== undefined) {
        content[update.contentKey] = {
          value: update.value,
          type: update.type || 'text',
          updatedAt: new Date().toISOString()
        };
        updatedCount++;
      }
    }

    await writeContentFile(content);

    res.json({
      success: true,
      message: `${updatedCount} content items updated successfully`,
      updatedCount: updatedCount
    });
  } catch (error) {
    console.error('Error batch updating content:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to batch update content',
      error: error.message
    });
  }
};

// POST /api/admin/content/reset[/:page]
const resetContent = async (req, res) => {
  try {
    const { page } = req.params;
    
    if (page) {
      // Reset specific page content
      const content = await readContentFile();
      const pagePrefix = `${page}:`;
      
      let resetCount = 0;
      for (const [key, defaultValue] of Object.entries(DEFAULT_CONTENT)) {
        if (key.startsWith(pagePrefix)) {
          content[key] = {
            ...defaultValue,
            updatedAt: new Date().toISOString()
          };
          resetCount++;
        }
      }

      await writeContentFile(content);

      res.json({
        success: true,
        message: `${resetCount} content items reset for page: ${page}`,
        resetCount: resetCount
      });
    } else {
      // Reset all content to defaults
      const resetContent = { ...DEFAULT_CONTENT };
      
      // Update all timestamps
      for (const key of Object.keys(resetContent)) {
        resetContent[key].updatedAt = new Date().toISOString();
      }

      await writeContentFile(resetContent);

      res.json({
        success: true,
        message: 'All content reset to defaults',
        resetCount: Object.keys(resetContent).length
      });
    }
  } catch (error) {
    console.error('Error resetting content:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset content',
      error: error.message
    });
  }
};

module.exports = {
  getAllContent,
  updateContent,
  batchUpdateContent,
  resetContent
};