import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from products.models import Product, Ingredient, Indication
from company.models import LeadershipMessage, CompanyInfo

def run_seed():
    print("Seeding Company Info...")
    CompanyInfo.objects.all().delete()
    CompanyInfo.objects.create(
        company_name="Biotech Vintae Pharma Ltd.",
        office_address="Jannatul Mawa G/125 Ground Floor, Beside Khaddo Bhaban, "
                       "Shahid Abdul Jobbar Sarak, Rahman Nagar, Bogura",
        mission="Our Mission is to create job opportunities for people. We pledge to "
                "ensure consistent quality, committed service, and customer satisfaction "
                "while fostering employee well-being, extensive training, and work-life balance.",
        vision="Our vision is to help unemployed people and lead the industry by implementing "
               "best-in-class practices in production and marketing, exceeding customer "
               "expectations, and maintaining excellence across all sectors."
    )

    print("Seeding Leadership Messages...")
    LeadershipMessage.objects.all().delete()
    LeadershipMessage.objects.create(
        name="Md. Salim Ibne Ali",
        role="CHAIRMAN",
        phone_number="01716-185705",
        message="At Biotech Vintae Pharma Ltd., our mission is to provide not just "
                "medicine but to resonate with your aspirations, life, and values. "
                "In today's dynamic medicine market, we understand the importance of Trust, healing, and innovation."
    )
    LeadershipMessage.objects.create(
        name="Md. Golam Eunush",
        role="MD",
        phone_number="01711-076557",
        message="This company was established primarily for human welfare. Our goal "
                "is to produce international standard medicines, market them at affordable "
                "prices, and help reduce unemployment among the educated youth of our country."
    )
    LeadershipMessage.objects.create(
        name="Md. Faruque Sultan",
        role="FINANCE",
        phone_number="01765-653583",
        message="Inclusiveness is key at Biotech Vintae Pharma Ltd. We are committed to "
                "creating affordable prices and helping people always. All our raw materials "
                "come from foreign sources to ensure world-class quality products."
    )

    print("Seeding Products...")
    Product.objects.all().delete()

    # 1. US Joint Max
    p1 = Product.objects.create(
        name="US Joint Max",
        slug="us-joint-max",
        category="Dietary & Nutritional Supplement",
        short_description="Provides support for healthy joints and cartilage. Unique combination "
                          "of high-grade glucosamine, chondroitin, hyaluronic acid, collagen type "
                          "2 with added Vit-C, MSM, ginger root & Vit-D.",
        dosage_instructions="1 or 2 tablets daily or as directed by health expert",
        presentation="3x10 Tablets per monopack",
        route_of_admin="Oral",
        storage_conditions="Store in a cool & dry place. Protect from direct sunlight, heat & moisture.",
        precautions="Not recommended if hypersensitive to any of the ingredients. Do not exceed recommended usage.",
        side_effects="Generally well tolerated. Rarely constipation, stomach ache, loss of appetite."
    )
    ingredients_p1 = [
        ("Glucosamine", "500 mg", "Builds and repairs cartilage padding around joints."),
        ("Chondroitin", "200 mg", "Prevents cartilage breakdown and stimulates repair."),
        ("Methylsulfonylmethane (MSM)", "133 mg", "Necessary for collagen production and "
                                                  "joint flexible connective tissue."),
        ("Collagen Type 2", "100 mg", "Protects bones in joints and prevents grinding."),
        ("Hyaluronic Acid", "50 mg", "Acts as a cushion and lubricant in joint fluids."),
        ("Turmeric", "100 mg", "Contains curcumin with powerful anti-inflammatory properties."),
        ("Ginger Root", "33 mg", "Provides natural anti-inflammatory and antioxidant benefits."),
        ("Vitamin C", "10 mg", "Involved in tissue repair and collagen formation."),
        ("Vitamin D", "400 IU", "Essential for maintaining healthy bones and calcium absorption.")
    ]
    for name, amt, role in ingredients_p1:
        Ingredient.objects.create(product=p1, name=name, amount=amt, role_description=role)

    indications_p1 = ["Osteoarthritis", "Brittle bone disease", "Osteoporosis", "Postmenopausal support",
                      "Calcium deficiency in elderly", "Hypoparathyroidism", "Musculoskeletal pain"]
    for ind in indications_p1:
        Indication.objects.create(product=p1, condition_name=ind)

    # 2. US Bion
    p2 = Product.objects.create(
        name="US Bion",
        slug="us-bion",
        category="Neurovitamins & Minerals",
        short_description="Provides Vitamin B1, B2, B6, B12, Zinc & essential minerals to support "
                          "overall nerve health and prevent vitamin B deficiencies.",
        dosage_instructions="1 tablet daily or as advised by physician",
        presentation="3x10 Tablets per monopack",
        route_of_admin="Oral"
    )
    indications_p2 = ["Diabetic neuropathy", "Sciatica", "Lumbago", "Trigeminal neuralgia",
                      "Facial paralysis", "Optic neuritis", "Cardiac complications"]
    for ind in indications_p2:
        Indication.objects.create(product=p2, condition_name=ind)

    # 3. US Cal-Dx
    p3 = Product.objects.create(
        name="US Cal-Dx",
        slug="us-cal-dx",
        category="Coral Calcium & Minerals",
        short_description="High potency coral calcium & minerals made from natural coral "
                          "fossils for advanced mineral supplementation and medical treatment.",
        dosage_instructions="1 tablet daily or as advised by physician",
        presentation="3x10 Tablets per monopack",
        route_of_admin="Oral"
    )
    indications_p3 = ["Healing heavy wounds", "Building strong bones", "Boosting energy levels",
                      "Strengthening immunity", "Supporting muscles & nerves", "Balancing hormones"]
    for ind in indications_p3:
        Indication.objects.create(product=p3, condition_name=ind)

    # 4. US Gold
    p4 = Product.objects.create(
        name="US Gold",
        slug="us-gold",
        category="High Potency Multivitamins & Minerals",
        short_description="Complete organic compound formula containing essential vitamins A to Z "
                          "and minerals needed for energy production, immunity, and overall health.",
        dosage_instructions="1 tablet daily",
        presentation="3x10 Tablets per monopack",
        route_of_admin="Oral"
    )
    indications_p4 = ["Energy production & metabolism", "Immune system support", "Bone and teeth health",
                      "Vision and eye health", "Circulatory system support", "Skin, hair & tissue repair",
                      "Healthy brain & nervous system"]
    for ind in indications_p4:
        Indication.objects.create(product=p4, condition_name=ind)

    # 5. US Pirulina
    p5 = Product.objects.create(
        name="US Pirulina",
        slug="us-pirulina",
        category="Herbal and Nutraceuticals",
        short_description="Pure Arthrospira Platensis (Spirulina) superfood, nutritionally "
                          "complete with rich protein, B12, essential fatty acids, and antioxidants.",
        dosage_instructions="2 to 4 capsules daily or as advised by the physician",
        presentation="Bottled Capsules",
        route_of_admin="Oral",
        side_effects="Generally well tolerated. Occasional diarrhea or mild GI discomfort may occur."
    )
    indications_p5 = ["Malnutrition prevention", "Immunity enhancement", "Anemia support",
                      "Diabetes & Hyperglycemia care", "Allergic rhinitis", "Eye and skin health maintenance"]
    for ind in indications_p5:
        Indication.objects.create(product=p5, condition_name=ind)

    # 6. US Biloba
    p6 = Product.objects.create(
        name="US Biloba",
        slug="us-biloba",
        category="Herbal and Nutraceuticals",
        short_description="Standardized Ginkgo Biloba extract supporting memory, "
                          "cognitive skills, and cerebral blood circulation.",
        dosage_instructions="120 to 240 mg daily in divided doses",
        presentation="3x10 Tablets per monopack",
        route_of_admin="Oral",
        precautions="Increases bleeding risk with blood thinners like aspirin/warfarin. "
                    "Discontinue prior to scheduled surgery."
    )
    indications_p6 = ["Cognitive impairment & memory support", "Cerebral insufficiency (headache, dizziness)",
                      "Intermittent claudication", "Vascular dementia"]
    for ind in indications_p6:
        Indication.objects.create(product=p6, condition_name=ind)

    print("Database seeding completed successfully!")


if __name__ == '__main__':
    run_seed()
